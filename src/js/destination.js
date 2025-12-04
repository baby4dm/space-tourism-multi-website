const DATA_URL = "/src/data/data.json";

const tabs = document.querySelectorAll(".destination");
const imageElement = document.getElementById("destination-image");
const titleElement = document.getElementById("destination-title");
const descriptionElement = document.getElementById("destination-description");
const distanceElement = document.getElementById("avg-dist");
const timeElement = document.getElementById("est-time");

let spaceData = null;

function updateDestination(destinationName) {
  if (!spaceData) return;

  const destination = spaceData.destinations.find(
    (dest) => dest.name.toLowerCase() === destinationName.toLowerCase()
  );

  if (!destination) {
    console.error(`Destination '${destinationName}' not found in data.`);
    return;
  }

  if (imageElement) {
    imageElement.src = destination.images.webp.replace("./assets", "/images");
    imageElement.alt = destination.name;
  }
  if (titleElement) titleElement.textContent = destination.name.toUpperCase();
  if (descriptionElement)
    descriptionElement.textContent = destination.description;
  if (distanceElement) distanceElement.textContent = destination.distance;
  if (timeElement) timeElement.textContent = destination.travel;
}

function setActiveTab(clickedTabId) {
  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });
  const clickedTab = document.getElementById(clickedTabId);
  if (clickedTab) {
    clickedTab.classList.add("active");
  }
}

async function init() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    spaceData = data;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const destinationId = tab.id;

        const destinationName =
          destinationId.charAt(0).toUpperCase() + destinationId.slice(1);

        updateDestination(destinationName);
        setActiveTab(destinationId);
      });
    });

    updateDestination("Moon");
    setActiveTab("moon");
  } catch (error) {
    console.error("Помилка завантаження або обробки даних:", error);
  }
}

document.addEventListener("DOMContentLoaded", init);
