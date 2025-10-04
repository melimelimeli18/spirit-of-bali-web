document.addEventListener("DOMContentLoaded", () => {
  const loveButtons = document.querySelectorAll(".love-btn");

  // helper: set icon state (true = filled, false = outline)
  function setIconState(btn, isFilled) {
    const icon = btn.querySelector("i");
    if (!icon) return;
    if (isFilled) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
    } else {
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
    }
  }

  // Fungsi untuk sync semua tombol berdasarkan localStorage
  function syncAllButtons() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    loveButtons.forEach(btn => {
      const parent = btn.closest(".right-content, .left-content");
      if (!parent) return;

      const titleEl = parent.querySelector("h1");
      const title = titleEl ? titleEl.innerText.trim() : null;
      if (!title) return;

      const exists = favorites.some(item => item.title === title);
      setIconState(btn, exists);
    });
  }

  // Inisialisasi: sinkronkan tombol berdasarkan localStorage
  syncAllButtons();

  // Klik handler
  loveButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const parent = btn.closest(".right-content, .left-content");
      if (!parent) return;

      const titleEl = parent.querySelector("h1");
      const subtitleEl = parent.querySelector("h3");
      const imgEl = parent.querySelector("img");

      const title = titleEl ? titleEl.innerText.trim() : "";
      const subtitle = subtitleEl ? subtitleEl.innerText.trim() : "";
      const img = imgEl ? imgEl.getAttribute("src") : "";

      if (!title) return; // butuh minimal identifier

      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      // cek keberadaan item
      const index = favorites.findIndex(item => item.title === title);

      const icon = btn.querySelector("i");
      // jika belum favorit -> tambahkan
      if (index === -1) {
        // ubah icon ke filled
        if (icon) {
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");
        }

        btn.classList.add("animate");
        setTimeout(() => btn.classList.remove("animate"), 300);

        const favItem = { title, subtitle, img };
        favorites.push(favItem);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        console.log("Added to favorites:", favItem);

      } else {
        // sudah favorit -> hapus dari array
        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        // ubah icon ke outline
        if (icon) {
          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");
        }

        console.log("Removed from favorites:", title);
      }

      // Emit event supaya listener lain (mis. modal) bisa re-render jika perlu
      document.dispatchEvent(new CustomEvent("favoritesUpdated", { detail: { favorites } }));
    });
  });

  // ⭐ TAMBAHAN: Listen untuk update dari modal
  document.addEventListener("favoritesUpdated", () => {
    syncAllButtons();
  });
});