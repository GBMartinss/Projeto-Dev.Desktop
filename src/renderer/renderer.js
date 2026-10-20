const form = document.querySelector('#login-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const message = document.querySelector('#message');

document.querySelector('#toggle-password').addEventListener('click', (event) => {
  const visible = password.type === 'text';

  password.type = visible ? 'password' : 'text';
  event.currentTarget.textContent = visible ? 'Mostrar' : 'Ocultar';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  message.textContent =
    'A interface está pronta! Vamos conectar a autenticação.';
});

document.querySelector('#register-link').addEventListener('click', (event) => {
  event.preventDefault();
  message.textContent = 'A tela de cadastro será nossa próxima etapa.';
});