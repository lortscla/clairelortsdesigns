document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     HAMBURGER MENU TOGGLE
  ========================= */

const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const stickyHamburger = document.querySelector(".sticky-hamburger-btn");

  // Helper that keeps both hamburger icons in sync with the mobile-nav state
  function syncHamburgerStates() {
    const isOpen = mobileNav && mobileNav.classList.contains("show");
    if (hamburger) hamburger.classList.toggle("is-active", isOpen);
    if (stickyHamburger) stickyHamburger.classList.toggle("is-active", isOpen);
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", function () {
      mobileNav.classList.toggle("show");
      syncHamburgerStates();
    });
  }

  if (stickyHamburger && mobileNav) {
    stickyHamburger.addEventListener("click", function () {
      mobileNav.classList.toggle("show");
      syncHamburgerStates();
    });
  }

  /* =========================
   CLOSE MOBILE NAV ON OUTSIDE CLICK
========================= */

document.addEventListener("click", function (event) {
  if (!mobileNav || !mobileNav.classList.contains("show")) return;

  const clickedInsideNav        = mobileNav.contains(event.target);
  const clickedHamburger        = hamburger && hamburger.contains(event.target);
  const clickedStickyHamburger  = stickyHamburger && stickyHamburger.contains(event.target);

  if (!clickedInsideNav && !clickedHamburger && !clickedStickyHamburger) {
    mobileNav.classList.remove("show");
    syncHamburgerStates();
  }
});


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

document.querySelectorAll('.nav-links a, .mobile-links > li > a, .sticky-nav > ul > li > a').forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage) {
    link.classList.add('active-page');
  }
});

// Highlight "Other Work" parent when on a sub-page
const subPages = ['sterling.html'];
if (subPages.includes(currentPage)) {
  document.querySelectorAll('.nav-links a, .mobile-links .mobile-dropdown-toggle, .sticky-nav > ul > li > a').forEach(link => {
    if (link.textContent.trim().startsWith('Other Work')) {
      link.classList.add('active-page');
    }
  });
}

/* =========================
     STICKY HEADER ON SCROLL
  ========================= */

  const stickyHeader = document.getElementById('stickyHeader');
  const SCROLL_THRESHOLD = 200;

  if (stickyHeader) {
    let ticking = false;

    function updateStickyHeader() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        stickyHeader.classList.add('show');
      } else {
        stickyHeader.classList.remove('show');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateStickyHeader);
        ticking = true;
      }
    });

    // Run once on load in case the page is opened scrolled (e.g. anchor link)
    updateStickyHeader();
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