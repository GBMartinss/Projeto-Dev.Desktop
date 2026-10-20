
//Biel: Aqui a estrutura coleta os dados do usuario com getUsers, saveUsers e etc...//

const TasklyStorage = (() => {
  const USERS_KEY = 'taskly_users';
  const TASKS_KEY = 'taskly_tasks';

  function read(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : [];
    } catch {
      throw new Error('Usuario não encontrado');
    }
  }

  function write(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function getUsers() {
    return read(USERS_KEY);
  }

  function saveUsers(users) {
    write(USERS_KEY, users);
  }

  function getTasks(userId) {
    return read(TASKS_KEY).filter(
      task => task.userId === userId
    );
  }

  function saveTask(userId, task) {
    if (!userId) {
      throw new Error('Usuário não identificado.');
    }

    const tasks = read(TASKS_KEY);
    tasks.push({
      ...task,
      id: crypto.randomUUID(),
      userId
    });

    write(TASKS_KEY, tasks);
  }

  return {
    getUsers,
    saveUsers,
    getTasks,
    saveTask
  };
})();

window.TasklyStorage = TasklyStorage;

console.log(
  'Taskly Storage carregado:',
  typeof window.TasklyStorage
);  //teste de localstorage para o cadastro/login//