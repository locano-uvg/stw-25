document.addEventListener('DOMContentLoaded', () => {
    createLoginForm();
});

function createLoginForm() {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.height = '100vh';

    const form = document.createElement('form');
    form.onsubmit = handleLogin;
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.gap = '10px';
    form.style.padding = '20px';
    form.style.border = '1px solid #ccc';
    form.style.borderRadius = '8px';
    form.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.placeholder = 'Usuario';
    userInput.name = 'username';
    userInput.required = true;
    userInput.style.padding = '10px';
    userInput.style.border = '1px solid #ccc';
    userInput.style.borderRadius = '4px';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Contraseña';
    passwordInput.name = 'password';
    passwordInput.required = true;
    passwordInput.style.padding = '10px';
    passwordInput.style.border = '1px solid #ccc';
    passwordInput.style.borderRadius = '4px';

    const loginButton = document.createElement('button');
    loginButton.type = 'submit';
    loginButton.textContent = 'Login';
    loginButton.style.padding = '10px';
    loginButton.style.border = 'none';
    loginButton.style.borderRadius = '4px';
    loginButton.style.backgroundColor = '#28a745';
    loginButton.style.color = '#fff';
    loginButton.style.cursor = 'pointer';

    const registerButton = document.createElement('button');
    registerButton.type = 'button';
    registerButton.textContent = 'Registrar';
    registerButton.onclick = showRegisterForm;
    registerButton.style.padding = '10px';
    registerButton.style.border = 'none';
    registerButton.style.borderRadius = '4px';
    registerButton.style.backgroundColor = '#007bff';
    registerButton.style.color = '#fff';
    registerButton.style.cursor = 'pointer';

    form.appendChild(userInput);
    form.appendChild(passwordInput);
    form.appendChild(loginButton);
    form.appendChild(registerButton);
    container.appendChild(form);
    document.body.appendChild(container);
}

function handleLogin(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    // Lógica para consultar la base de datos SQLite
    fetch('http://localhost:3000/validateUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.exists) {
            showWelcomePage();
        } else {
            alert('Usuario no disponible');
        }
    })
    .catch(error => console.error('Error:', error));
}


function showRegisterForm() {
    
    document.body.innerHTML = '';
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.height = '100vh';

    const form = document.createElement('form');
    form.onsubmit = handleRegister;
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.gap = '10px';
    form.style.padding = '20px';
    form.style.border = '1px solid #ccc';
    form.style.borderRadius = '8px';
    form.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.placeholder = 'Nuevo Usuario';
    userInput.name = 'username';
    userInput.required = true;
    userInput.style.padding = '10px';
    userInput.style.border = '1px solid #ccc';
    userInput.style.borderRadius = '4px';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Nueva Contraseña';
    passwordInput.name = 'password';
    passwordInput.required = true;
    passwordInput.style.padding = '10px';
    passwordInput.style.border = '1px solid #ccc';
    passwordInput.style.borderRadius = '4px';

    const registerButton = document.createElement('button');
    registerButton.type = 'submit';
    registerButton.textContent = 'Registrar';
    registerButton.style.padding = '10px';
    registerButton.style.border = 'none';
    registerButton.style.borderRadius = '4px';
    registerButton.style.backgroundColor = '#28a745';
    registerButton.style.color = '#fff';
    registerButton.style.cursor = 'pointer';

    form.appendChild(userInput);
    form.appendChild(passwordInput);
    form.appendChild(registerButton);
    container.appendChild(form);
    document.body.appendChild(container);
}

function handleRegister(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    // Lógica para registrar el nuevo usuario en la base de datos SQLite
    fetch('http://localhost:3000/registerUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Usuario registrado exitosamente');
            createLoginForm();
        } else {
            alert('Error al registrar usuario');
        }
    })
    .catch(error => console.error('Error:', error));
}

function showWelcomePage() {
    document.body.innerHTML = '<h1>Bienvenido</h1>';
}
