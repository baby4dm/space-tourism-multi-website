const DATA_URL = "/src/data/data.json";

const dots = document.querySelectorAll(".dot");
const roleElement = document.getElementById("position");
const nameElement = document.getElementById("name");
const bioElement = document.getElementById("description");
const imageElement = document.getElementById("person-img");

// Групуємо текстові елементи для зручності
const textElements = [roleElement, nameElement, bioElement];

let crewData = null;

function updateCrew(index) {
  if (!crewData) return;
  const member = crewData[index];

  // 1. FADE OUT: Додаємо прозорість всім елементам (текст + фото)
  [...textElements, imageElement].forEach((el) => {
    el.classList.add("opacity-0");
  });

  // 2. ЗАТРИМКА: Чекаємо 500мс (відповідає duration-500 у CSS), поки елементи зникнуть
  setTimeout(() => {
    // 3. ОНОВЛЕННЯ ДАНИХ (коли все невидиме)
    roleElement.textContent = member.role.toUpperCase();
    nameElement.textContent = member.name.toUpperCase();
    bioElement.textContent = member.bio;

    // Налаштування зображення
    imageElement.src = member.images.webp.replace("./assets", "/images");
    imageElement.alt = member.name;

    // 4. FADE IN (Поява)

    // Текст показуємо одразу після оновлення
    textElements.forEach((el) => {
      el.classList.remove("opacity-0");
    });

    // Картинку показуємо тільки коли вона завантажиться браузером
    imageElement.onload = () => {
      imageElement.classList.remove("opacity-0");
    };

    // Якщо картинка закешована, onload може спрацювати миттєво або вже спрацював,
    // тому перевіряємо complete
    if (imageElement.complete) {
      imageElement.classList.remove("opacity-0");
    }
  }, 500); // Час має співпадати з CSS класом duration-500
}

function setActiveDot(activeIndex) {
  dots.forEach((dot, index) => {
    if (index === activeIndex) dot.classList.add("active");
    else dot.classList.remove("active");
  });
}

async function init() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    crewData = data.crew;

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        // Додаємо перевірку, щоб не клікати на вже активну точку (уникнення зайвої анімації)
        if (!dot.classList.contains("active")) {
          updateCrew(index);
          setActiveDot(index);
        }
      });
    });

    // Початкова ініціалізація без анімації (або з нею, за бажанням)
    // Тут ми просто показуємо дані, оскільки HTML вже має статичні дані,
    // можна оновити тільки картинку, щоб запустити її onload
    const firstMember = crewData[0];
    imageElement.src = firstMember.images.webp.replace("./assets", "/images");
    imageElement.onload = () => imageElement.classList.remove("opacity-0");
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", init);
