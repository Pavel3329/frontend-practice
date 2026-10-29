const BASE_URL = "https://dummyjson.com";

const container = document.querySelector("#container");
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const getAllBtn = document.querySelector(".getAllBtn");

async function fetchTodos() {
  try {
    const response = await fetch(`${BASE_URL}/todos`);

    if (!response.ok) {
      throw new Error("Не удалось получить задачи");
    }

    const data = await response.json();

    return data.todos;
  } catch (error) {
    console.log(error.message);

    return null;
  }
}

async function createTodo(todoData) {
  try {
    const response = await fetch(`${BASE_URL}/todos/add`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(todoData),
    });

    if (!response.ok) {
      throw new Error("Не удалось добавить задачу");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);

    return null;
  }
}

// Отрисовка
const renderTodo = (todoData) => {
  const todo = document.createElement("div");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");

  todo.className = "todo";

  checkbox.type = "checkbox";
  checkbox.checked = todoData.completed;
  checkbox.id = `todo-${todoData.id}`;

  label.className = "todo__label";
  label.htmlFor = checkbox.id;
  label.textContent = todoData.todo;

  if (todoData.completed) {
    label.classList.add("todo__label--done");
  }

  checkbox.addEventListener("change", () => {
    label.classList.toggle("todo__label--done", checkbox.checked);
  });

  todo.append(checkbox, label);
  container.append(todo);
};

// Обработка отправки и создание новой задачи
const createNewTodo = async (event) => {
  event.preventDefault();

  const todoText = input.value.trim();

  if (todoText === "") {
    return;
  }

  const todoData = {
    todo: todoText,
    completed: false,
    userId: 5,
  };

  const newTodo = await createTodo(todoData);

  if (newTodo === null) {
    return;
  }

  renderTodo(newTodo);

  form.reset();
};

async function loadTodos() {
  const todos = await fetchTodos();

  if (todos === null) {
    return;
  }

  // Очищаем старые задачи перед повторной отрисовкой
  const renderedTodos = container.querySelectorAll(".todo");

  renderedTodos.forEach((todo) => {
    todo.remove();
  });

  todos.forEach((todo) => {
    renderTodo(todo);
  });
}

form.addEventListener("submit", createNewTodo);

// Повторно получаем все задачи
getAllBtn.addEventListener("click", loadTodos);

loadTodos();
