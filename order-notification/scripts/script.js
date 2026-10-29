const orderForm = document.querySelector(".orderForm");
const orderButtons = document.querySelector(".orderButtons");
const notificationContainer = document.querySelector(".notificationContainer");

// Обработка отправки формы заказа
orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Забираем значения полей формы
  const address = orderForm.elements["address"].value.trim();
  const price = orderForm.elements["price"].value;
  const receiver = orderForm.elements["receiver"].value.trim();

  // Проверяем, что все поля заполнены
  if (!address || !price || !receiver) {
    return;
  }

  // блок с кнопками статусов заказа
  orderButtons.classList.remove("hidden");

  showNotification(
    "Order created",
    `Order for ${receiver} has been created successfully.`,
    "success",
  );

  orderForm.reset();
});

orderButtons.addEventListener("click", (event) => {
  const button = event.target;

  if (button.classList.contains("paidBtn")) {
    showNotification("Order paid", "Payment received.", "info");
  }

  if (button.classList.contains("sentBtn")) {
    showNotification("Order sent", "Your order is on its way.", "warning");
  }

  if (button.classList.contains("receivedBtn")) {
    showNotification("Order received", "Thank you for your order.", "success");
  }
});

// Класс для работы с уведомлениями
class Notifications {
  static notificationsList = [];

  constructor(title, type, info) {
    this.id = Math.random();
    this.title = title;
    this.type = type;
    this.info = info;
  }

  static renderNotifications(list) {
    notificationContainer.innerHTML = "";

    list.forEach((notificationData) => {
      const notification = document.createElement("div");
      const icon = document.createElement("span");
      const content = document.createElement("div");
      const title = document.createElement("h3");
      const info = document.createElement("p");
      const closeButton = document.createElement("button");

      notification.className = `notification notification--${notificationData.type}`;
      icon.className = "notification__icon";
      icon.textContent = "✓";

      content.className = "notification__content";

      title.className = "notification__title";
      title.textContent = notificationData.title;

      info.className = "notification__message";
      info.textContent = notificationData.info;

      closeButton.className = "notification__close";
      closeButton.type = "button";
      closeButton.textContent = "×";
      closeButton.setAttribute("aria-label", "Close notification");

      closeButton.addEventListener("click", () => {
        Notifications.deleteNotifications(notificationData.id);
      });

      // Собираем уведомление и добавляем в контейнер
      content.append(title, info);
      notification.append(icon, content, closeButton);
      notificationContainer.prepend(notification);
    });
  }

  static deleteNotifications(id) {
    Notifications.notificationsList = Notifications.notificationsList.filter(
      (notification) => notification.id !== id,
    );

    Notifications.renderNotifications(Notifications.notificationsList);
  }
}
// Функция-помощник для создания и показа уведомления
function showNotification(title, info, type = "success") {
  const notification = new Notifications(title, type, info);

  Notifications.notificationsList.push(notification);

  Notifications.renderNotifications(Notifications.notificationsList);
}
