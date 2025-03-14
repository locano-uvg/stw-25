
function start() {
    let container = document.createElement('div');

    let h1title = document.createElement('h1');
    h1title.textContent = 'Fetch API';
    container.appendChild(h1title);
    return container;
}
function getPosts(container) {

    let getPost = document.createElement('h2');
    getPost.textContent = 'Get Post';

    let containerPosts = document.createElement('div');
    containerPosts.id = 'containerPosts';
    container.appendChild(getPost);
    container.appendChild(containerPosts);


    let start_button = document.createElement('button');
    start_button.textContent = 'Get Post';
    start_button.onclick = function () {
        fetch('http://awita.site:3000/posts')
            .then(response => response.json())
            .then(data => {
                let containerPosts = document.getElementById('containerPosts');
                containerPosts.innerHTML = '';
                let posts = data.posts
                let u = document.createElement('ul');
                for (let i = 0; i < posts.length; i++) {
                    let li = document.createElement('li');
                    li.textContent = 'id: ' + posts[i].id + ' titulo: ' + posts[i].titulo;
                    u.appendChild(li);
                }
                containerPosts.appendChild(u);
            });
    }
    container.appendChild(start_button);

}

function getComments(container) {
    let getComment = document.createElement('h2');
    getComment.textContent = 'Get Coments';

    let containerComments = document.createElement('div');
    containerComments.id = 'containerComments';
    container.appendChild(getComment);
    container.appendChild(containerComments);

    let input_id = document.createElement('input');
    input_id.type = 'number';
    input_id.placeholder = 'Post id';

    let start_button = document.createElement('button');
    start_button.textContent = 'Get Post Comments';
    start_button.onclick = function () {
        if (!input_id.value) {
            alert('Digite un id');
            return;
        }
        let idPost = input_id.value;

        fetch('http://awita.site:3000/comments/' + idPost)
            .then(response => response.json())
            .then(data => {
                let containerComments = document.getElementById('containerComments');
                containerComments.innerHTML = '';
                let comments = data.comments
                let u = document.createElement('ul');
                for (let i = 0; i < comments.length; i++) {
                    let li = document.createElement('li');
                    li.textContent = 'username: ' + comments[i].username + ' comentario: ' + comments[i].comentario;
                    u.appendChild(li);
                }
                containerComments.appendChild(u);
            });
    }
    container.appendChild(input_id);
    container.appendChild(start_button);
}

function postComment(container) {
    let postComment = document.createElement('h2');
    postComment.textContent = 'New Coment to Post';

    let containerPostComment = document.createElement('div');
    containerPostComment.id = 'containerPostComment';
    container.appendChild(postComment);
    container.appendChild(containerPostComment);

    let input_id = document.createElement('input');
    input_id.type = 'number';
    input_id.placeholder = 'Post id';

    let input_username = document.createElement('input');
    input_username.type = 'text';
    input_username.placeholder = 'username';

    let input_comentario = document.createElement('input');
    input_comentario.type = 'text';
    input_comentario.placeholder = 'comentario';

    let start_button = document.createElement('button');
    start_button.textContent = 'Post Comment';
    start_button.onclick = function () {
        if (!input_id.value || !input_username.value || !input_comentario.value) {
            alert('Digite un id, username y comentario');
            return;
        }
        let idPost = input_id.value;
        let username = input_username.value;
        let comentario = input_comentario.value;

        fetch('http://awita.site:3000/comment', {
            method: 'POST',
            body: JSON.stringify({ post_id: idPost, username: username, comentario: comentario }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                let containerPostComment = document.getElementById('containerPostComment');
                containerPostComment.innerHTML = '';
                let p = document.createElement('p');
                p.textContent = 'Comentario creado';
                containerPostComment.appendChild(p);
            });
    }
    container.appendChild(input_id);
    container.appendChild(input_username);
    container.appendChild(input_comentario);
    container.appendChild(start_button);
}

function validarURL(str) {
    const patron = new RegExp("^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$");
    return patron.test(str);
}

function validarImagen(url) {
    return (
      url
        .trim()
        .toLowerCase()
        .match(/\.(jpeg|jpg|gif|png)$/) != null
    );
  }

let validar =validarURL('http://awita.site:3000/posts');
if (validar){
    let test = validarImagen('https://i.pcmag.com/imagery/roundups/06msR0ZNV3Oc2GfpqCu9AcT-14..v1632927607.jpg');
    console.log("test",test);
    
    if (test == true){
        // creo el elemento img que apunte a la url
    }else{
        // creas un objeto de tipo p, iframe, a
    }
}

console.log(validarURL('http hola'));

container = start();
getPosts(container);
getComments(container);
postComment(container);
document.body.appendChild(container);

let btnWin = document.createElement('button');
btnWin.textContent = 'Open new window';
btnWin.onclick = function () {
    let win = window.open('./post.html', '_blank');
    localStorage.setItem("id",2)
    win.focus();
}

let btnWin2 = document.createElement('button');
btnWin2.textContent = 'change window content';
btnWin2.onclick = function () {
    window.location.href = 'http://awita.site:3000/posts';
}


document.body.appendChild(btnWin);
document.body.appendChild(btnWin2);