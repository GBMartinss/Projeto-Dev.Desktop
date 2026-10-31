
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

    window.location.href = 'perfil.html';
  } catch (error) {
    message.textContent = error.message || 'Não foi possível entrar.';
  }
});

document.querySelector('#register-link').addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = 'register.html';
});

// controles personalizados

const btnClose = document.getElementById('btn-close');
const btnMinimize = document.getElementById('btn-minimize');
const btnMaximize = document.getElementById('btn-maximize');

if (btnClose) {
  btnClose.addEventListener('click', () => {
    window.windowControls.close();
  });
}

if (btnMinimize) {
  btnMinimize.addEventListener('click', () => {
    window.windowControls.minimize();
  });
}

if (btnMaximize) {
  btnMaximize.addEventListener('click', () => {
    window.windowControls.maximize();
  });
}