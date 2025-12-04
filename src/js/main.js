document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    const href = item.getAttribute("href");

    if (href === currentPage) {
      item.classList.add("active");
    }

    if (currentPage === "" && href === "index.html") {
      item.classList.add("active");
    }
  });
});
