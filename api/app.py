from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

@app.route('/describe', methods=['POST'])
def describe_image():
    data = request.json
    image_url = data.get('image_url')

    if not image_url:
        return jsonify({'error': 'No image URL provided'}), 400

    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "system",
                "content": "You are a cool image analyst. Your goal is to describe what is in this image."
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "What is in the image?"
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_url
                        }
                    }
                ]
            }
        ],
        "max_tokens": 500
    }

    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=payload)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to get description from OpenAI', 'details': response.json()}), 500

    r = response.json()
    description = r.get("choices", [{}])[0].get("message", {}).get("content", "No description found")

    return jsonify({'description': description})

if __name__ == '__main__':
    app.run(debug=True)
