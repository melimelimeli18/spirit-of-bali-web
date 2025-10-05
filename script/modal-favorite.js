// script/modal-favorite.js
document.addEventListener("DOMContentLoaded", () => {
    const favBtn = document.querySelector(".favorite-btn");
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    document.body.appendChild(overlay);

    const modal = document.createElement("div");
    modal.id = "favorite-modal";

    // Struktur awal modal
    modal.innerHTML = `
        <h2 style="margin-bottom:1.5rem;" >My Favorite</h2>
        <div id="favorite-list"></div>
    `;
    document.body.appendChild(modal);

    function renderFavorites() {
        const favoriteList = document.getElementById("favorite-list");
        favoriteList.innerHTML = ""; 

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favorites.length === 0) {
            favoriteList.innerHTML = "<p>Daftar favoritmu masih kosong.</p>";
            return;
        }

        favorites.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("fav-card");
            card.style.borderBottom = "1px solid #e0e0e0"; // garis horizontal abu-abu tipis
            card.style.paddingBottom = "12px";
            card.style.marginBottom = "12px";
            card.style.display = "flex";
            card.style.alignItems = "center";
            card.style.justifyContent = "space-between";
            card.style.position = "relative";
            
            // Hapus border di item terakhir
            if (index === favorites.length - 1) {
                card.style.borderBottom = "none";
            }
            
            card.innerHTML = `
                <div style="display: flex; align-items: center; flex: 1;">
                    <img src="${item.img}" alt="${item.title}" style="width:80px;height:60px;object-fit:cover;border-radius:6px;margin-right:10px;">
                    <div>
                        <h4 style="margin: 0 0 4px 0;">${item.title}</h4>
                        <p style="margin: 0; color: #666; font-size: 14px;">${item.subtitle}</p>
                    </div>
                </div>
                <button class="unfavorite-btn" data-title="${item.title}" style="background:none;border:none;cursor:pointer;padding:8px;margin-left:12px;">
                    <i class="fa-solid fa-heart" style="color:#e74c3c;font-size:20px;"></i>
                </button>
            `;
            favoriteList.appendChild(card);
        });

        // Tambahkan event listener untuk tombol unfavorite
        const unfavBtns = favoriteList.querySelectorAll(".unfavorite-btn");
        unfavBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const title = btn.getAttribute("data-title");
                removeFromFavorites(title);
            });
        });
    }

    function removeFromFavorites(title) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        
        // Hapus item dari array
        favorites = favorites.filter(item => item.title !== title);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        // Update tampilan modal
        renderFavorites();

        // Update tombol love di halaman utama
        updateMainPageLoveButton(title, false);

        // Emit event untuk sinkronisasi
        document.dispatchEvent(new CustomEvent("favoritesUpdated", { detail: { favorites } }));
        
        console.log("Removed from favorites (modal):", title);
    }

    function updateMainPageLoveButton(title, isFavorited) {
        // Cari semua tombol love di halaman
        const loveButtons = document.querySelectorAll(".love-btn");
        
        loveButtons.forEach(btn => {
            const parent = btn.closest(".right-content, .left-content");
            if (!parent) return;

            const titleEl = parent.querySelector("h1");
            const itemTitle = titleEl ? titleEl.innerText.trim() : "";
            
            if (itemTitle === title) {
                const icon = btn.querySelector("i");
                if (!icon) return;
                
                if (isFavorited) {
                    icon.classList.remove("fa-regular");
                    icon.classList.add("fa-solid");
                } else {
                    icon.classList.remove("fa-solid");
                    icon.classList.add("fa-regular");
                }
            }
        });
    }

    function toggleModal() {
        const isVisible = modal.style.display === "block";
        if (isVisible) {
            modal.style.display = "none";
            overlay.style.display = "none";
        } else {
            renderFavorites(); // ⬅ render setiap kali buka
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

    // Listen untuk update dari btn-add-favorite.js
    document.addEventListener("favoritesUpdated", () => {
        // Jika modal sedang terbuka, re-render
        if (modal.style.display === "block") {
            renderFavorites();
        }
    });
});