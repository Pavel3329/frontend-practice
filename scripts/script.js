const openModalBtn = document.querySelector(".openModalBtn");

const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modalBody");
const closeModalBtn = document.querySelector(".closeModalBtn");

const registrationForm = document.querySelector(".registrationForm");

const confirmModal = document.querySelector(".confirmModal");
const confirmModalBody = document.querySelector(".confirmModalBody");
const confirmBtn = document.querySelector(".confirmBtn");

const openModal = () => {
  modal.classList.remove("modalHidden");
};

const closeModal = () => {
  modal.classList.add("modalHidden");
};

const openConfirmModal = () => {
  confirmModal.classList.remove("modalHidden");
};

const closeConfirmModal = () => {
  confirmModal.classList.add("modalHidden");
};

openModalBtn.addEventListener("click", openModal);

// закрытие первой модалки по крестику
closeModalBtn.addEventListener("click", closeModal);

// закрытие первой модалки по фону
modal.addEventListener("click", closeModal);

// не закрывать первую модалку при клике внутри
modalBody.addEventListener("click", (event) => {
  event.stopPropagation();
});

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  openConfirmModal();
});

confirmBtn.addEventListener("click", closeConfirmModal);

// закрытие второй модалки по фону
confirmModal.addEventListener("click", closeConfirmModal);

// не закрывать вторую модалку при клике внутри
confirmModalBody.addEventListener("click", (event) => {
  event.stopPropagation();
});

// закрытие по Escape
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (!confirmModal.classList.contains("modalHidden")) {
    closeConfirmModal();
    return;
  }

  if (!modal.classList.contains("modalHidden")) {
    closeModal();
  }
});
