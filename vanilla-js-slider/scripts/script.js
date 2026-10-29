const root = document.querySelector("#root");

let sliderIndex = 0;
const roundButtons = [];

const images = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",

  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",

  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80",

  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
];

const slideWidth = 500;

const frame = document.createElement("div");
const cards = document.createElement("div");
const triggers = document.createElement("div");

const leftBtn = document.createElement("button");
const rightBtn = document.createElement("button");

leftBtn.textContent = "<";
rightBtn.textContent = ">";

triggers.append(leftBtn, rightBtn);
frame.append(cards, triggers);
root.append(frame);

frame.classList.add("frame");
cards.classList.add("cards");
triggers.classList.add("triggers");

// Создаём по одной card на каждую картинку
images.forEach((image) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundImage = `url("${image}")`;
  cards.append(card);
});

// Подсвечиваем активную точку по текущему sliderIndex
function updateActiveRound() {
  roundButtons.forEach((btn, i) => {
    btn.classList.toggle("active", i === sliderIndex);
  });
}

// Двигает ленту и обновляет подсветку
function goToSlide(index) {
  sliderIndex = index;
  cards.style.left = `${-slideWidth * sliderIndex}px`;
  updateActiveRound();
}

leftBtn.addEventListener("click", () => {
  if (sliderIndex > 0) {
    goToSlide(sliderIndex - 1);
  }
});

rightBtn.addEventListener("click", () => {
  if (sliderIndex < images.length - 1) {
    goToSlide(sliderIndex + 1);
  }
});

// Создаёт нижнюю навигацию и вешает на каждую переход к своему слайду
function createRounds() {
  const container = document.createElement("div");
  container.classList.add("rounds");
  frame.append(container);

  images.forEach((_, i) => {
    const button = document.createElement("button");
    container.append(button);
    roundButtons.push(button);

    button.addEventListener("click", () => {
      goToSlide(i);
    });
  });

  // Сразу подсвечиваем первый слайд при загрузке
  updateActiveRound();
}

createRounds();
