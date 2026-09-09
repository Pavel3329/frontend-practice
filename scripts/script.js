const registrationForm = document.querySelector(".registration");
const loginForm = document.querySelector(".login");

//   регистрациия
const userNameInput = document.querySelector(".name");
const phoneInput = document.querySelector(".phone");
const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");

// авторизация
const loginEmailInput = document.querySelector(".login-email");
const loginPasswordInput = document.querySelector(".login-password");

//   вывод ошибки или результат ++
const message = document.querySelector(".message");

//    пользователи из localStorage, или пустой массив
const users = JSON.parse(localStorage.getItem("users")) || [];

//только буквы, длина от 2 - 24
function isValidName(name) {
  return /^\p{L}{2,24}$/u.test(name);
}

function isValidEmail(email) {
  return email.includes("@") && email.length >= 7;
}

// Проверяем плюс в начале, количество цифр и лишние символы
function isValidPhone(phone) {
  const numbers = "0123456789";

  const invalidCharacters = Array.from(phone).filter((character, index) => {
    return index > 0 && !numbers.includes(character);
  });

  const numbersCount = phone.length - 1;

  return (
    phone[0] === "+" &&
    numbersCount >= 8 &&
    numbersCount <= 12 &&
    invalidCharacters.length === 0
  );
}

function isValidPassword(password) {
  return password.length >= 5 && password.length <= 26;
}

// Обработчик формы
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = userNameInput.value;
  const phone = phoneInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  // проверка пустых полей
  if (name === "" || phone === "" || email === "" || password === "") {
    message.textContent = "Все поля обязательны!";
    message.className = "message error";
  } else if (!isValidName(name)) {
    message.textContent =
      "Имя должно содержать от 2 до 24 символов и только буквы";
    message.className = "message error";
  } else if (!isValidEmail(email)) {
    message.textContent =
      "Email должен содержать символ @ и минимум 7 символов";
    message.className = "message error";
  } else if (!isValidPhone(phone)) {
    message.textContent =
      "Телефон должен начинаться с + и содержать от 8 до 12 цифр";
    message.className = "message error";
  } else if (!isValidPassword(password)) {
    message.textContent = "Пароль должен содержать от 5 до 26 символов";
    message.className = "message error";
  } else {
    // Смотрим, есть ли уже пользователь с таким email
    const userExists = users.some((user) => {
      return user.email === email;
    });

    if (userExists) {
      message.textContent = "Пользователь с таким email уже зарегистрирован";
      message.className = "message error";
    } else {
      // Создание нового пользователя
      const user = {
        name: name,
        phone: phone,
        email: email,
        password: password,
      };

      // Добавление и сохранение в массив
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      message.textContent = "Вы успешно зарегистрировались";
      message.className = "message success";

      //   очищаем поля
      userNameInput.value = "";
      phoneInput.value = "";
      emailInput.value = "";
      passwordInput.value = "";
    }
  }
});

// Обработчик формы входа
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (loginEmailInput.value === "" || loginPasswordInput.value === "") {
    message.textContent = "Все поля обязательны!";
    message.className = "message error";
  } else {
    //      совпадение email и пароля
    const user = users.find((user) => {
      return (
        user.email === loginEmailInput.value &&
        user.password === loginPasswordInput.value
      );
    });

    if (!user) {
      message.textContent = "Неверный email или пароль";
      message.className = "message error";
    } else {
      message.textContent = "Вы успешно вошли";
      message.className = "message success";

      // Очистка полей после успешного входа
      loginEmailInput.value = "";
      loginPasswordInput.value = "";
    }
  }
});
