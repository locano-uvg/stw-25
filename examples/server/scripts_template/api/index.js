const express = require('express');

const app = express();
app.use(express.json());
const port = 4200;

const blogPosts = [
    {"id": 1, "title": "Primer post", "content": "Contenido del primer post"},
    {"id": 2, "title": "Segundo post", "content": "Contenido del segundo post"}
]

app.get('/', (req, res) => {
    // lógica para extraer data de mi base de datos
    let variable_html_string = `
        <h1>Endpoints</h1>
        <ul>
            <li>Get Posts - /get</li>
        </ul>
    `;
    let variable_html_string2 = '<h2>hola amigos</h2>';
    res.send(variable_html_string + variable_html_string2);
})
// creo una ruta para obtener los posts
app.get('/posts', (req, res) => {
    res.json(blogPosts);
})

app.get('/posts/:post_id', (req, res) => {
    let id_a_buscar = req.params.post_id;
    let post = blogPosts.find(post => post.id == id_a_buscar);
    if (post) {
        res.json(post);
    } else {
        res.status(404).send({
            message: 'Post not found'
        });
    }
})

app.post("/posts", (req, res) => {
    // console.log("req", req);
    let newPost = req.body;    
    blogPosts.push(newPost);
    res.json(newPost);
}
)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})