document.addEventListener("DOMContentLoaded", () => {
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".left-content, .right-content"); 

filterButtons.forEach(btn => {
btn.addEventListener("click", () => {
    // reset active button
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    cards.forEach(card => {
    const title = card.querySelector("h1").innerText.toLowerCase();

    if (filter === "all") {
        card.style.display = "flex";
    } else if (filter === "tradition" && title.includes("tenganan")) {
        card.style.display = "flex";
    } else if (filter === "art" && title.includes("ubud")) {
        card.style.display = "flex";
    } else if (filter === "clean" && title.includes("penglipuran")) {
        card.style.display = "flex";
    } else if (filter === "unesco" && title.includes("jatiluwih")) {
        card.style.display = "flex";
    } else {
        card.style.display = "none";
    }
    });
});
});
});
