import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader
from langchain.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)
CORS(app)

PDF_FOLDER = "pdf_library"
INDEX_FOLDER = "faiss_index"

os.makedirs(PDF_FOLDER, exist_ok=True)
os.makedirs(INDEX_FOLDER, exist_ok=True)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def extract_text_from_pdfs(folder_path):
    text = ""
    for file_name in os.listdir(folder_path):
        if file_name.endswith(".pdf"):
            pdf_path = os.path.join(folder_path, file_name)
            pdf_reader = PdfReader(pdf_path)
            for page in pdf_reader.pages:
                text += page.extract_text()
    return text

def split_text_into_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    return text_splitter.split_text(text)

def create_vector_store(chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(chunks, embedding=embeddings)
    vector_store.save_local(INDEX_FOLDER)

def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context. If the answer is not in
    the context, respond with, "The answer is not available in the context."\n\n
    Context:\n {context}\n
    Question:\n {question}\n
    Answer:
    """
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain

def process_pdf_folder():
    print("Processing PDF folder...")
    raw_text = extract_text_from_pdfs(PDF_FOLDER)
    if not raw_text.strip():
        print("No text extracted from PDFs.")
        return
    text_chunks = split_text_into_chunks(raw_text)
    create_vector_store(text_chunks)
    print("PDF processing completed and FAISS index created.")

process_pdf_folder()

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    question = data.get("question", "")
    if not question:
        return jsonify({"answer": "No question provided."}), 400

    try:
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        vector_store = FAISS.load_local(INDEX_FOLDER, embeddings, allow_dangerous_deserialization=True)
        docs = vector_store.similarity_search(question)

        chain = get_conversational_chain()
        response = chain({"input_documents": docs, "question": question}, return_only_outputs=True)
        return jsonify({"answer": response["output_text"]})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"answer": "An error occurred while processing your request."}), 500

@app.route('/')
def home():
    return "Welcome to the Flask AI Chat API! Use the /api/chat endpoint for interactions."

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)
