# pip3 install flask
# python3 app.py
from flask import Flask, request, jsonify

app = Flask(__name__)

# Base de datos simulada
posts = [
    {"id": 1, "title": "Primer post", "content": "Contenido del primer post"},
    {"id": 2, "title": "Segundo post", "content": "Contenido del segundo post"}
]

@app.route('/', methods=['GET'])
def get_welcome_screen():
    return jsonify({
        "message": "Bienvenido a la API de posts",
        "endpoints": {
            "GET /posts": "Obtener todos los posts",
            "GET /posts/<int:post_id>": "Obtener un post por ID",
            "POST /posts": "Crear un nuevo post",
        }
    })


# Obtener todos los posts
@app.route('/posts', methods=['GET'])
def get_posts():
    return jsonify(posts)

# Obtener un post por ID
@app.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    for post in posts:
        if post["id"] == post_id:
            return jsonify(post)
    return ("Post no encontrado", 404)

# Crear un nuevo post
@app.route('/posts', methods=['POST'])
def create_post():
    new_post = request.json
    new_post["id"] = len(posts) + 1
    posts.append(new_post)
    return jsonify(new_post), 201


if __name__ == '__main__':
    app.run(debug=True, port=3001)