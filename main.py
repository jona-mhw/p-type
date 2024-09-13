from flask import Flask, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    return "Bienvenido al servidor del juego R-Type!"

@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory('rtype_style_game_v3_o1mini', path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
