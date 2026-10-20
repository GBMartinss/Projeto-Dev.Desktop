
const form = document.querySelector('#login-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const message = document.querySelector('#message');

document.querySelector('#toggle-password').addEventListener('click', (event) => {
  const visible = password.type === 'text';

  password.type = visible ? 'password' : 'text';
  event.currentTarget.textContent = visible ? 'Mostrar' : 'Ocultar';
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  message.textContent = '';

  try {
    const user = await window.TasklyStorage.loginUser(
      email.value,
      password.value
    );

    sessionStorage.setItem('taskly_current_user', JSON.stringify(user));

    message.textContent = `Bem-vindo, ${user.name}!`;
  } catch (error) {
    message.textContent = error.message || 'Não foi possível entrar.';
  }
});

document.querySelector('#register-link').addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = 'register.html';
});
