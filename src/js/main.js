document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();

  const navItems = document.querySelectorAll(".nav-item, .mobile-nav-item");

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
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger-btn");
  const closeBtn = document.querySelector(".close-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  hamburger.addEventListener("click", () => {
    mobileMenu.classList.add("mobile-menu-open");
  });

  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("mobile-menu-open");
  });
});
