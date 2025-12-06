const DATA_URL = "./src/data/data.json";

const dots = document.querySelectorAll(".dot");
const roleElement = document.getElementById("position");
const nameElement = document.getElementById("name");
const bioElement = document.getElementById("description");
const imageElement = document.getElementById("person-img");

const textElements = [roleElement, nameElement, bioElement];

let crewData = null;

function updateCrew(index) {
  if (!crewData) return;
  const member = crewData[index];

  [...textElements, imageElement].forEach((el) => {
    el.classList.add("opacity-0");
  });

  setTimeout(() => {
    roleElement.textContent = member.role.toUpperCase();
    nameElement.textContent = member.name.toUpperCase();
    bioElement.textContent = member.bio;

    imageElement.src = member.images.webp.replace("./assets", "./images");
    imageElement.alt = member.name;

    textElements.forEach((el) => {
      el.classList.remove("opacity-0");
    });

    imageElement.onload = () => {
      imageElement.classList.remove("opacity-0");
    };

    if (imageElement.complete) {
      imageElement.classList.remove("opacity-0");
    }
  }, 500);
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
        if (!dot.classList.contains("active")) {
          updateCrew(index);
          setActiveDot(index);
        }
      });
    });

    const firstMember = crewData[0];
    imageElement.src = firstMember.images.webp.replace("./assets", "./images");
    imageElement.onload = () => imageElement.classList.remove("opacity-0");
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", init);
