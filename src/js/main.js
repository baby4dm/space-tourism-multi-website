document.addEventListener("DOMContentLoaded", () => {
  // ===== ACTIVE LINK =====
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navItems = document.querySelectorAll(".nav-item, .mobile-nav-item");

  navItems.forEach((item) => {
    const href = item.getAttribute("href");
    if (href === currentPage) {
      item.classList.add("active");
    }
  });

  // ===== MOBILE MENU =====
  const hamburger = document.querySelector(".hamburger-btn");
  const closeBtn = document.querySelector(".close-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburger && closeBtn && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.add("mobile-menu-open");
    });

    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("mobile-menu-open");
    });
  }
});
