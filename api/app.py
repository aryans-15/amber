from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from threading import Lock
from pydub import AudioSegment
from datetime import datetime
import os
import requests
import pytz
import base64
import io

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
    image_base64 = data.get('image_base64')
    if not image_base64:
        return jsonify({'error': 'No image base64 data provided'}), 400
    prompt = data.get('prompt', '')
    print(prompt)

    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": f"There is a user asking for your help in analyzing an image. Please answer their question in its entirety, or if it is too confusing, ask them to re-iterate the request. Be semi-formal, but not overly formal. Be confident; even if you are slightly unsure, do not indicate so in your response. Limit responses to 1 sentence."},  # Using f-string for interpolation
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": f"'{prompt}'"},
                    {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{image_base64}"}}
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
