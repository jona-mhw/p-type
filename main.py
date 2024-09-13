from flask import Flask, send_from_directory, abort
import os

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    try:
        if os.path.exists(os.path.join('static', path)):
            return send_from_directory('static', path)
        else:
            return send_from_directory('.', path)
    except FileNotFoundError:
        abort(404)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
