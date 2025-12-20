
document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     HAMBURGER MENU TOGGLE
  ========================= */

  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("is-active");
      mobileNav.classList.toggle("show");
    });
  }

  /* =========================
     MOBILE DROPDOWN TOGGLES
  ========================= */

  const toggles = document.querySelectorAll(".mobile-dropdown-toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", function () {
      const submenu = this.nextElementSibling;
      const symbol = this.querySelector(".toggle-symbol");

      submenu.classList.toggle("show");
      symbol.textContent = submenu.classList.contains("show") ? "–" : "+";
    });
  });

  /* =========================
     IMAGE CAROUSEL
  ========================= */

  const track = document.querySelector(".carousel-track");
  const images = document.querySelectorAll(".carousel-track img");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (track && images.length && prevBtn && nextBtn) {
    let index = 0;
    const gap = 16; // must match CSS gap

    function updateCarousel() {
      const imageWidth = images[0].getBoundingClientRect().width + gap;
      track.style.transform = `translateX(-${index * imageWidth}px)`;
    }

    nextBtn.addEventListener("click", () => {
      if (index < images.length - 3) {
        index++;
        updateCarousel();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (index > 0) {
        index--;
        updateCarousel();
      }
    });

    window.addEventListener("resize", updateCarousel);
  }

});