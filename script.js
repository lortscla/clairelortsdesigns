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
     hero slideshow
  ========================= */

  const images = [
  'images/wooden/studs-5.webp',
  'images/wooden/earrings-12.webp',
  'images/wooden/earrings-15.webp',
   'images/wooden/earrings-14.webp',
   'images/wooden/earrings-16.webp',
];

const DISPLAY_TIME = 2800;
const FADE_TIME    = 1700;
let current = 0;

const container = document.querySelector('.slideshow');
if (container) {
const slides = images.map((url, i) => {
  const div = document.createElement('div');
  div.className = 'slide' + (i === 0 ? ' active' : '');
  div.style.backgroundImage = `url(${url})`;
  container.appendChild(div);
  return div;
});

setInterval(() => {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}, DISPLAY_TIME + FADE_TIME);
}

/* =========================
   ACTIVE NAV HIGHLIGHTING
========================= */

const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-links a, .mobile-links > li > a').forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage) {
    link.classList.add('active-page');
  }
});

// Highlight "Other Work" parent when on a sub-page
const subPages = ['sterling.html'];
if (subPages.includes(currentPage)) {
  document.querySelectorAll('.nav-links a, .mobile-links .mobile-dropdown-toggle').forEach(link => {
    if (link.textContent.trim().startsWith('Other Work')) {
      link.classList.add('active-page');
    }
  });
}

  /* =========================
     IMAGE CAROUSEL
  ========================= */

const carouselWrappers = document.querySelectorAll(".carousel-wrapper, .carousel-wrapper-reverse");

carouselWrappers.forEach((wrapper, wrapperIndex) => {
  const viewport = wrapper.querySelector(".carousel-viewport");
  const track = wrapper.querySelector(".carousel-track");
  const images = wrapper.querySelectorAll(".carousel-track img");
  const prevBtn = wrapper.querySelector(".carousel-btn.prev");
  const nextBtn = wrapper.querySelector(".carousel-btn.next");

  // Safety check - make sure all elements exist
  if (!track || !viewport || !prevBtn || !nextBtn || images.length === 0) {
    console.warn("Carousel", wrapperIndex, "missing elements:", {
      track: !!track,
      viewport: !!viewport, 
      prevBtn: !!prevBtn,
      nextBtn: !!nextBtn,
      imageCount: images.length
    });
    return;
  }

  let index = 0;
  const gap = 2; 

  function updateCarousel() {
    const imageWidth = images[0].getBoundingClientRect().width + gap;
    track.style.transform = `translateX(-${index * imageWidth}px)`;
  }

  nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (index < images.length - 1) {
      index++;
    } else {
      index = 0; // Loop back to first image
    }
    updateCarousel();
  });

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (index > 0) {
      index--;
    } else {
      index = images.length - 1; // Loop to last image
    }
    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);
});
});