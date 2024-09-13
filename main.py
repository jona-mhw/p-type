from flask import Flask, send_from_directory, send_file, abort
import os

app = Flask(__name__)

@app.route('/')
def index():
    try:
        return send_file('index.html')
    except FileNotFoundError:
        return "Error: index.html no encontrado. Asegúrate de que el archivo exista en el directorio raíz.", 404

@app.route('/<path:path>')
def serve_file(path):
    try:
        return send_file(path)
    except FileNotFoundError:
        abort(404)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
