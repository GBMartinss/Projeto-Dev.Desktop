
//Biel: Aqui a estrutura coleta os dados do usuario com getUsers, saveUsers e etc...//
const TasklyStorage = (() => {
  const USERS_KEY = 'taskly_users';
  const TASKS_KEY = 'taskly_tasks';

  function read(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : [];
    } catch {
      throw new Error('Não foi possível ler os dados locais.');
    }
  }

  function write(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  async function hashPassword(password, salt) {
    const data = new TextEncoder().encode(`${salt}:${password}`);
    const hash = await crypto.subtle.digest('SHA-256', data);

    return Array.from(new Uint8Array(hash))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  async function registerUser(name, email, password) {
    const users = read(USERS_KEY);
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some(user => user.email === normalizedEmail)) {
      throw new Error('Este e-mail já está cadastrado.');
    }

    const salt = crypto.randomUUID();
    const passwordHash = await hashPassword(password, salt);

    const user = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      salt,
      passwordHash
    };

    users.push(user);
    write(USERS_KEY, users);

    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }

  async function loginUser(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = read(USERS_KEY).find(
      item => item.email === normalizedEmail
    );

    if (!user) {
      throw new Error('E-mail ou senha incorretos.');
    }

    const passwordHash = await hashPassword(password, user.salt);

    if (passwordHash !== user.passwordHash) {
      throw new Error('E-mail ou senha incorretos.');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }

  function getTasks(userId) {
    return read(TASKS_KEY).filter(task => task.userId === userId);
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
    registerUser,
    loginUser,
    getTasks,
    saveTask
  };
})();

window.TasklyStorage = TasklyStorage;
