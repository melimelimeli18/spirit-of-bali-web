const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const overlay = document.getElementById("overlay");

const body = document.body;

hamburger.addEventListener("click", () => {
  // toggle hamburger animasi
  hamburger.classList.toggle("active");

  // toggle menu nav
  navLinks.classList.toggle("open");

  // toggle overlay
  overlay.classList.toggle("active");

  // prevent scroll saat menu terbuka
  body.classList.toggle("menu-open");
});

overlay.addEventListener("click", () => {
  // close menu dan reset hamburger
  hamburger.classList.remove("active");
  navLinks.classList.remove("open");
  overlay.classList.remove("active");

  // enable scroll kembali
  body.classList.remove("menu-open");
});
