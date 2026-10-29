const openModalBtn = document.querySelector(".openModalBtn");
const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modalBody");
const closeModalBtn = document.querySelector(".closeModalBtn");
const acceptBtn = document.querySelector(".acceptBtn");

const openModal = () => {
  modal.classList.remove("modalHidden");
};

const closeModal = () => {
  modal.classList.add("modalHidden");
};

openModalBtn.addEventListener("click", openModal);

//  закрытие по клику на фон
modal.addEventListener("click", closeModal);

//не закрывать при клике внутри modalBody
modalBody.addEventListener("click", (event) => {
  event.stopPropagation();
});

// закрытие по крестику
closeModalBtn.addEventListener("click", closeModal);

// закрытие по кнопке accept
acceptBtn.addEventListener("click", closeModal);

//  закрытие по Esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("modalHidden")) {
    closeModal();
  }
});
