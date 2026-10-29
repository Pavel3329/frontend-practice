const navMenu = document.querySelector(".navMenu");
const openNavMenuBtn = document.querySelector("#openButton");
const closeNavMenuBtn = document.querySelector("#closeButton");
const navMenuItems = document.querySelectorAll(".navMenuItem");

const toggleMenu = () => {
  navMenu.classList.toggle("navMenuOpen");
  document.body.classList.toggle("menuOpen");
};

openNavMenuBtn.addEventListener("click", toggleMenu);
closeNavMenuBtn.addEventListener("click", toggleMenu);

// - Аккордеон -
navMenuItems.forEach((item) => {
  item.addEventListener("click", () => {
    const currentSubmenu = item.nextElementSibling;
    const isOpen = currentSubmenu.classList.contains("submenuOpen");

    document.querySelectorAll(".submenu").forEach((sub) => {
      sub.classList.remove("submenuOpen");
    });

    if (!isOpen) {
      currentSubmenu.classList.add("submenuOpen");
    }
  });
});

// - Закрытие по клику вне меню -
document.addEventListener("click", (event) => {
  const isClickInsideMenu = navMenu.contains(event.target);
  const isClickOnOpenBtn = openNavMenuBtn.contains(event.target);

  if (!isClickInsideMenu && !isClickOnOpenBtn) {
    navMenu.classList.remove("navMenuOpen");
    document.body.classList.remove("menuOpen");
  }
});
