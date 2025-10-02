document.addEventListener("DOMContentLoaded", () => {
  // Ambil semua tombol open modal
  const openModalBtns = document.querySelectorAll("[data-modal-target]");
  const closeModalBtns = document.querySelectorAll("[data-close-btn]");

  // Buka modal
  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute("data-modal-target");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "flex";
      }
    });
  });

  // Tutup modal (pakai tombol X)
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal-overlay");
      if (modal) {
        modal.style.display = "none";
      }
    });
  });

  // Klik luar modal untuk tutup
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.style.display = "none";
    }
  });
});
