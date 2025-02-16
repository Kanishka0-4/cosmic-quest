import React, { useState, useEffect } from 'react';
import './SpaceQuiz.css';

const SpaceQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Curated space-related questions
  const curatedQuestions = [
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Jupiter", "Saturn", "Mars"],
      answer: "Jupiter",
    },
    {
      question: "What is the name of the galaxy that contains our Solar System?",
      options: ["Andromeda", "Milky Way", "Sombrero", "Whirlpool"],
      answer: "Milky Way",
    },
    {
      question: "What is the closest star to Earth?",
      options: ["Proxima Centauri", "Sirius", "Alpha Centauri", "Betelgeuse"],
      answer: "Proxima Centauri",
    },
    {
      question: "What planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Mercury"],
      answer: "Mars",
    },
    {
      question: "What is the name of the first human to travel into space?",
      options: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "John Glenn"],
      answer: "Yuri Gagarin",
    },
  ];

  useEffect(() => {
    // Set curated questions
    setQuestions(curatedQuestions);
  }, []);

  const playSound = (type) => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = type === 'correct' ? 'sine' : 'square';
    oscillator.frequency.setValueAtTime(type === 'correct' ? 400 : 200, context.currentTime);
    gainNode.gain.setValueAtTime(0.2, context.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.5);
  };

  const handleAnswerClick = (option) => {
    if (option === questions[currentQuestion].answer) {
      playSound('correct');
      setScore(score + 1);
    } else {
      playSound('incorrect');
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  const animateBackground = () => {
    const body = document.body;
    body.animate(
      [
        { backgroundColor: '#000428' },
        { backgroundColor: '#004e92' },
        { backgroundColor: '#000428' },
      ],
      {
        duration: 2000,
        iterations: 1 }
    );
  };

  useEffect(() => {
    animateBackground();
  }, [currentQuestion]);

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="result-box">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <button onClick={resetQuiz}>Restart Quiz</button>
        </div>
      ) : questions.length > 0 ? (
        <div className="quiz-box">
          <h2 className="quiz-question">{questions[currentQuestion].question}</h2>
          <div className="quiz-options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="quiz-option"
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default SpaceQuiz;