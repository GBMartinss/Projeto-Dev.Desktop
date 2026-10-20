
const form = document.querySelector('#register-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const message = document.querySelector('#message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  message.textContent = '';

  if (name.length < 2) {
    message.textContent = 'Digite um nome com pelo menos 2 caracteres.';
    return;
  }

  if (password !== confirmPassword) {
    message.textContent = 'As senhas não coincidem.';
    return;
  }

  try {
    await window.TasklyStorage.registerUser(name, email, password);

    message.textContent = 'Conta criada com sucesso! Redirecionando...';

    form.reset();

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1200);
  } catch (error) {
    message.textContent = error.message || 'Não foi possível criar a conta.';
  }
});
