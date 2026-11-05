// BOTÃO DE SAIR //
const botaoSair = document.querySelector('#btn-sair');

botaoSair.addEventListener('click', () => {
  sessionStorage.removeItem('taskly_current_user');
  window.location.assign(new URL('index.html', document.baseURI).href);
});


// ELEMENTOS DA TELA

const taskForm = document.getElementById("task-form");
const taskName = document.getElementById("task-name");
const taskTime = document.getElementById("task-time");
const taskPeriod = document.getElementById("task-period");

// CHAVE PARA SALVAR AS TAREFAS

const STORAGE_KEY = "taskly_routine_tasks";

// CARREGAR TAREFAS SALVAS

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// DATA ATUAL

function showDate() {
    const today = new Date();

    const date = today.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    document.getElementById("current-date").textContent = date;
}

// SALVAR TAREFAS

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ADICIONAR UMA TAREFA

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = taskName.value.trim();
    const time = taskTime.value;
    const period = taskPeriod.value;

    if (!name || !time) {
        alert("Preencha o nome e o horário da atividade!");
        return;
    }

    const newTask = {
        id: Date.now(),
        name: name,
        time: time,
        period: period,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskForm.reset();
    taskName.focus();
});

// MOSTRAR TAREFAS NA TELA

function renderTasks() {

    const morningList = document.getElementById("morning-list");
    const afternoonList = document.getElementById("afternoon-list");
    const nightList = document.getElementById("night-list");

    morningList.innerHTML = "";
    afternoonList.innerHTML = "";
    nightList.innerHTML = "";

    const lists = {
        morning: morningList,
        afternoon: afternoonList,
        night: nightList
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        return a.time.localeCompare(b.time);
    });

    // SEPARAR POR PERÍODO

    sortedTasks.forEach(function(task) {

        const taskElement = document.createElement("div");

        taskElement.className = "task-item";

        if (task.completed) {
            taskElement.classList.add("completed");
        }

        // CHECKBOX

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            toggleTask(task.id);
        });

        // INFORMAÇÕES

        const taskInfo = document.createElement("div");

        taskInfo.className = "task-info";

        const taskTitle = document.createElement("h4");
        taskTitle.textContent = task.name;

        const taskHour = document.createElement("span");
        taskHour.textContent = "◷ " + task.time;

        taskInfo.appendChild(taskTitle);
        taskInfo.appendChild(taskHour);

        // BOTÃO EXCLUIR

        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-task";
        deleteButton.textContent = "✕";
        deleteButton.title = "Excluir atividade";

        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        // MONTAR TAREFA

        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskInfo);
        taskElement.appendChild(deleteButton);

        lists[task.period].appendChild(taskElement);

    });

    // MENSAGEM QUANDO NÃO EXISTIREM TAREFAS

    Object.values(lists).forEach(function(list) {

        if (list.children.length === 0) {

            const message = document.createElement("p");

            message.className = "empty-message";
            message.textContent = "Nenhuma atividade cadastrada ainda.";

            list.appendChild(message);
        }

    });

    updateSummary();
}

// MARCAR TAREFA COMO CONCLUÍDA

function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;

    });

    saveTasks();
    renderTasks();
}

// EXCLUIR TAREFA

function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks();
    renderTasks();
}

// ATUALIZAR RESUMO E PROGRESSO

function updateSummary() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("total-tasks").textContent = total;

    document.getElementById("pending-tasks").textContent = pending;

    document.getElementById("completed-tasks").textContent = completed;

    document.getElementById("progress-number").textContent =
        percentage + "%";

    document.getElementById("progress-fill").style.width =
        percentage + "%";

    // MENSAGEM DE PROGRESSO

    const progressMessage = document.getElementById("progress-message");

    if (total === 0) {
        progressMessage.textContent = "Vamos começar sua rotina!";
    } else if (percentage === 100) {
        progressMessage.textContent = "Parabéns! Você concluiu tudo!";
    } else if (percentage >= 50) {
        progressMessage.textContent = "Você está quase lá!";
    } else {
        progressMessage.textContent = "Continue avançando!";
    }
}

// INICIALIZAR A PÁGINA

showDate();
renderTasks();
