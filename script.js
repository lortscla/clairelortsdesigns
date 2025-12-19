
document.querySelector(".hamburger").addEventListener("click", function () {
    this.classList.toggle("is-active");
    document.querySelector(".mobile-nav").classList.toggle("show");
});

// Mobile dropdown toggles
const toggles = document.querySelectorAll(".mobile-dropdown-toggle");

toggles.forEach(toggle => {
    toggle.addEventListener("click", function () {
        const submenu = this.nextElementSibling;
        const symbol = this.querySelector(".toggle-symbol");

        submenu.classList.toggle("show");

        symbol.textContent = submenu.classList.contains("show") ? "–" : "+";
    });
});
