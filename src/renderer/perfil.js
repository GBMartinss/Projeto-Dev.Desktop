const botaoSair = document.querySelector('#btn-sair');

botaoSair.addEventListener('click', () => {
  sessionStorage.removeItem('taskly_current_user');
  window.location.assign(new URL('index.html', document.baseURI).href);
});
