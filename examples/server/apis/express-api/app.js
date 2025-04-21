// npm install 
// node app.js

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4200;
const rateLimiter = require('./middleware/rateLimiter');

const startDB = require('./db/database');
const db = startDB();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    //   Create a html home page with the available routes from the API
    // Puedes agregar estilos css a los elementos html

    res.send(`
    <html>
        <head>
            <title>API Routes</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                }
                h1 {
                    color: #333;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    margin: 10px 0;
                }
                a {
                    text-decoration: none;
                    color: #007BFF;
                    font-weight: bold;
                }
                a:hover {
                    text-decoration: underline;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    background: #fff;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                }
                .description {
                    color: #555;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>API Routes</h1>
                <ul>
                    <li>
                        <a href="/posts">GET /posts</a>
                        <p class="description">Fetches all posts from the database.</p>
                    </li>
                    <li>
                        <a href="/comments/1">GET /comments/{post_id}</a>
                        <p class="description">Fetches all comments for a specific post by post_id.</p>
                    </li>
                    <li>
                        <a href="/post">POST /post</a>
                        <p class="description">Creates a new post. Expects a JSON body with the following fields: 
                        <code>
                            <pre style="color: #d32baf;">
{
    "titulo": "string",
    "descripcion": "string",
    "imagen": "string",
    "fecha": "string",
    "categoria": "string"
}
                            </pre>  
                        </code>
                        </p>
                    </li>
                    <li>
                        <a href="/comment">POST /comment</a>
                        <p class="description">Creates a new comment. Expects a JSON body with the following fields: 
                            <code>
                            <pre style="color: #d32baf;">
{
    "post_id": "number",
    "username": "string",
    "comentario": "string"
}
                            </pre>  
                        </code>
                        </p>
                    </li>
                    <li>
                        <a href="/post/1">DELETE /post/{post_id}</a>
                        <p class="description">Delete a comment. Expects a JSON body with the following fields: 
                            <code>
                            <pre style="color: #d32baf;">
{
    "password": "number",
}
                            </pre>  
                        </code>
                        </p>
                    </li>
                </ul>
            </div>
        </body>
    </html>
`);
}
);

app.get('/comments/:post_id', (req, res) => {
    const post_id = req.params.post_id;

    db.all("SELECT * FROM comments WHERE post_id = ?", [post_id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ comments: rows });
    });
});

app.get('/posts', (req, res) => {
    db.all("SELECT * FROM posts", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ posts: rows });
    });
});

app.use(rateLimiter);

app.post('/post', (req, res) => {
    let { titulo, descripcion, imagen, fecha, categoria } = req.body;
    if (!titulo || titulo.trim() === '' || titulo === undefined) {
        res.status(400).json({ error: 'titulo is required' });
        return
    }

    titulo = titulo || '';
    descripcion = descripcion || '';
    imagen = imagen || '';
    fecha = fecha || new Date().toISOString();
    categoria = categoria || 'Undefined';

    db.run("INSERT INTO posts (titulo, descripcion, imagen, fecha, categoria) VALUES (?, ?, ?, ?, ?)", [titulo, descripcion, imagen, fecha, categoria], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ success: true });
    });
}
);

app.post('/comment', (req, res) => {
    const { post_id, username, comentario } = req.body;
    db.run("INSERT INTO comments (post_id, username, comentario, fecha) VALUES (?, ?, ?, ?)", [post_id, username, comentario, new Date().toISOString()], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ success: true });
    });
});

app.delete('/post/:id', (req, res) => {
    const id = req.params.id;
    const password = req.body.password;
    if (password !== 'admin_admin') {
        res.status(401).json({ error: 'Invalid password' });
        return
    }
    db.run("DELETE FROM posts WHERE id = ?", id, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ success: true });
    });
});



app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}/`);
});
