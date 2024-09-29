from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
from threading import Lock
import os
from datetime import datetime, timezone
import pytz

app = Flask(__name__)
CORS(app)
load_dotenv()

user_caches = {}
lock = Lock()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

@app.route('/describe', methods=['POST'])
def describe_image():
    data = request.json
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({'error': 'user_id must be provided'}), 400
    image_url = data.get('image_url')
    if not image_url:
        return jsonify({'error': 'No image URL provided'}), 400
    prompt = data.get('prompt', '')

    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": "You are a cool image analyst. Your goal is to describe what is in this image. The user is asking you: ' + prompt + ' Limit responses to 1 sentence. "},
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "What is in the image?"},
                    {"type": "image_url", "image_url": {"url": image_url}}
                ]
            }
        ],
        "max_tokens": 500
    }

    headers = {"Authorization": f"Bearer {OPENAI_API_KEY}", "Content-Type": "application/json"}

    try:
        response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=payload)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return jsonify({'error': 'Failed to get description from OpenAI', 'details': str(e)}), 500

    r = response.json()
    description = r.get("choices", [{}])[0].get("message", {}).get("content", "No description found")
    timestamp = datetime.now(pytz.timezone('US/Eastern')).isoformat()

    with lock:
        if user_id not in user_caches:
            user_caches[user_id] = [(description, timestamp)]
        else:
            user_caches[user_id].append((description, timestamp))

    return jsonify({'description': description})

@app.route('/query', methods=['GET'])
def query_latest():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'user_id must be provided'}), 400
    with lock:
        cache = user_caches.get(user_id, []).copy()
    # the data should probably already be sorted, but let's do this to be safe
    latest_outputs = sorted(cache, key=lambda x: x[1])
    return jsonify({'latest_outputs': latest_outputs}), 200

@app.route('/clear', methods=['POST'])
def clear_cache():
    data = request.json
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({'error': 'user_id must be provided'}), 400
    
    with lock:
        if user_id in user_caches:
            del user_caches[user_id]
        return jsonify({'message': 'Cache cleared successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
