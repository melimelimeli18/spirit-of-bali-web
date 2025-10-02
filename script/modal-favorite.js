document.addEventListener("DOMContentLoaded", () => {
    const favBtn = document.querySelector(".favorite-btn");
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    document.body.appendChild(overlay);

    const modal = document.createElement("div");
    modal.id = "favorite-modal";
    modal.innerHTML = "<h2>My Favorite</h2><p>Daftar favoritmu akan muncul di sini</p>";
    document.body.appendChild(modal);

    function toggleModal() {
    const isVisible = modal.style.display === "block";
    if (isVisible) {
        modal.style.display = "none";
        overlay.style.display = "none";
    } else {
        modal.style.display = "block";
        overlay.style.display = "block";
    }
    }

    favBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // biar klik button ga nutup langsung
    toggleModal();
    });

    // Klik overlay untuk menutup modal
    overlay.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none";
    });
});