document.addEventListener("DOMContentLoaded", () => {
  const loveButtons = document.querySelectorAll(".love-btn");

  loveButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const icon = btn.querySelector("i");

      // toggle antara outline & filled
      if (icon.classList.contains("fa-regular")) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");

        // animasi scale
        btn.classList.add("animate");
        setTimeout(() => btn.classList.remove("animate"), 300);

      } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
      }
    });
  });
});
