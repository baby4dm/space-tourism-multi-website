const DATA_URL = "/src/data/data.json";

const buttons = document.querySelectorAll(".tech-indicator-btn");
const titleElement = document.getElementById("title");
const descElement = document.getElementById("description");
const imageElement = document.getElementById("tech-img");

const textElements = [titleElement, descElement];

let techData = [];
let currentIndex = 0;

function getImageUrl(item) {
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  const path = isDesktop ? item.images.portrait : item.images.landscape;
  return path.replace("./assets", "/images");
}

function updateTechnology(index) {
  if (!techData) return;
  const item = techData[index];
  currentIndex = index;

  [...textElements, imageElement].forEach((el) => {
    el.classList.add("opacity-0");
  });

  setTimeout(() => {
    titleElement.textContent = item.name.toUpperCase();
    descElement.textContent = item.description;

    const imgUrl = getImageUrl(item);

    const imgLoader = new Image();
    imgLoader.src = imgUrl;

    imgLoader.onload = () => {
      imageElement.style.backgroundImage = `url('${imgUrl}')`;
      imageElement.classList.remove("opacity-0");
    };

    textElements.forEach((el) => {
      el.classList.remove("opacity-0");
    });
  }, 500);
}

function setActiveButton(activeIndex) {
  buttons.forEach((btn, index) => {
    if (index === activeIndex) {
      btn.classList.add("active");
      btn.style.backgroundColor = "white";
      btn.style.color = "black";
    } else {
      btn.classList.remove("active");
      btn.style.backgroundColor = "";
      btn.style.color = "";
    }
  });
}

async function init() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    techData = data.technology;

    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        if (!btn.classList.contains("active")) {
          setActiveButton(index);
          updateTechnology(index);
        }
      });
    });

    const firstItem = techData[0];
    const initialImgUrl = getImageUrl(firstItem);
    imageElement.style.backgroundImage = `url('${initialImgUrl}')`;

    setActiveButton(0);
  } catch (error) {
    console.error("Помилка завантаження даних:", error);
  }
}

window.addEventListener("resize", () => {
  if (techData && techData.length > 0) {
    const item = techData[currentIndex];
    const imgUrl = getImageUrl(item);
    imageElement.style.backgroundImage = `url('${imgUrl}')`;
  }
});

document.addEventListener("DOMContentLoaded", init);
