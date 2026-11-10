
/* Botão de sair */
const botaoSair = document.querySelector('#btn-sair');

if (botaoSair) {
    botaoSair.addEventListener('click', () => {
        sessionStorage.removeItem('taskly_current_user');
    });
}

/* Elementos da tela */
const formularioPerfil = document.getElementById("form-perfil");

const idade = document.getElementById("idade");
const altura = document.getElementById("altura");
const peso = document.getElementById("peso");
const descricao = document.getElementById("descricao");

const formularioConfiguracoes = document.getElementById("form-configuracoes");

const novoNome = document.getElementById("novo-nome");
const novoUsuario = document.getElementById("novo-usuario");

const nomePerfil = document.getElementById("nome-perfil");
const usuarioPerfil = document.getElementById("usuario-perfil");

const escolherFoto = document.getElementById("escolher-foto");
const fotoPerfil = document.getElementById("foto-perfil");
const letraAvatar = document.getElementById("letra-avatar");

const botaoTema = document.getElementById("btn-tema");

/* CArregar dados do perfil */
const dadosSalvos = localStorage.getItem("dadosPerfil");

if (dadosSalvos) {
    const perfil = JSON.parse(dadosSalvos);

    idade.value = perfil.idade || "";
    altura.value = perfil.altura || "";
    peso.value = perfil.peso || "";
    descricao.value = perfil.descricao || "";
}

/* Salvar informações pessoais */
if (formularioPerfil) {
    formularioPerfil.addEventListener("submit", function(event) {
        event.preventDefault();

        const dadosPerfil = {
            idade: idade.value,
            altura: altura.value,
            peso: peso.value,
            descricao: descricao.value
        };

        localStorage.setItem("dadosPerfil", JSON.stringify(dadosPerfil));

        alert("Informações salvas com sucesso!");
    });
}

/* Carregar nome e usuário */
const configuracoesSalvas = localStorage.getItem("configuracoesPerfil");

if (configuracoesSalvas) {
    const configuracoes = JSON.parse(configuracoesSalvas);

    nomePerfil.textContent = configuracoes.nome || "Seu nome";
    usuarioPerfil.textContent = configuracoes.usuario ? "@" + configuracoes.usuario.replace (/^@/, "") : "@usuario";

    novoNome.value = configuracoes.nome || "";
    novoUsuario.value = configuracoes.usuario || "";
}

/* Alterar nome e usuário */
if (formularioConfiguracoes) {
    formularioConfiguracoes.addEventListener("submit", function(event) {
        event.preventDefault();

        const configuracoes = {
            nome: novoNome.value,
            usuario: novoUsuario.value
        };

        localStorage.setItem("configuracoesPerfil", JSON.stringify(configuracoes));

        nomePerfil.textContent = configuracoes.nome || "Seu nome";
        usuarioPerfil.textContent = configuracoes.usuario ? "@" + configuracoes.usuario.replace (/^@/, "") : "@usuario";

        alert("Configurações atualizadas com sucesso!");
    });
}

/* Alterar foto de perfil */
if (escolherFoto) {
    escolherFoto.addEventListener("change", function() {
        const arquivo = escolherFoto.files[0];

        if (!arquivo) {
            return;
        }

        if (!arquivo.type.startsWith("image/")) {
            alert("Escolha um arquivo de imagem!");
            return;
        }

        const leitor = new FileReader();

        leitor.onload = function(event) {
            const imagem = event.target.result;

            fotoPerfil.src = imagem;
            fotoPerfil.style.display = "block";

            letraAvatar.style.display = "none";

            localStorage.setItem("fotoPerfil", imagem);
        };

        leitor.readAsDataURL(arquivo);
    });
}

/* Carregar foto salva */
const fotoSalva = localStorage.getItem("fotoPerfil");

if (fotoSalva) {
    fotoPerfil.src = fotoSalva;
    fotoPerfil.style.display = "block";

    letraAvatar.style.display = "none";
}

/* Alternar tema do app */

const temaSalvo = localStorage.getItem("temaTaskly");

/* Ativar tema salvo */
if (temaSalvo === "escuro") {
    document.body.classList.add("modo-escuro");
}

/* Alterar tema pelo botão */
if (botaoTema) {
    botaoTema.addEventListener("click", function() {

        document.body.classList.toggle("modo-escuro");

        const temaAtivo = document.body.classList.contains("modo-escuro");

        if (temaAtivo) {
            localStorage.setItem("temaTaskly", "escuro");
        } else {
            localStorage.setItem("temaTaskly", "claro");
        }
    });
}
