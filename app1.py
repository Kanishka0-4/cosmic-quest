from flask import Flask, jsonify
from flask_cors import CORS
import feedparser

app = Flask(__name__)
CORS(app)

rss_urls = [
    'https://www.nasa.gov/news-release/feed/',
    'https://www.space.com/home/feed/site.xml',
    'https://astronomynow.com/feed/',
]

@app.route('/rss', methods=['GET'])
def get_rss_feeds():
    """Fetch RSS feeds from multiple URLs and limit the results to 20 entries."""
    entries = []
    
    for rss_url in rss_urls:
        feed = feedparser.parse(rss_url)
        for entry in feed.entries:
            title = entry.get('title', '')
            description = entry.get('description', '')

            entries.append({
                'title': title,
                'link': entry.link,  
                'description': description
            })

    limited_entries = entries[:20]

    return jsonify({'entries': limited_entries})

if __name__ == '__main__':
    app.run(debug=True)
