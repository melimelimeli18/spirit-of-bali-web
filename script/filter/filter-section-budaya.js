document.addEventListener("DOMContentLoaded", () => {
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".left-content, .right-content");

filterButtons.forEach(btn => {
btn.addEventListener("click", () => {
    // reset active state
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    cards.forEach(card => {
    const title = card.querySelector("h1").innerText.toLowerCase();

    if (filter === "all") {
        card.style.display = "flex";
    } else if (filter === "dance" && (title.includes("dance"))) {
        card.style.display = "flex";
    } else if (filter === "ceremony" && (
        title.includes("offering") ||
        title.includes("ngaben") ||
        title.includes("melasti") ||
        title.includes("galungan")
    )) {
        card.style.display = "flex";
    } else if (filter === "architecture" && (
        title.includes("cultural house") ||
        title.includes("bale") ||
        title.includes("candi")
    )) {
        card.style.display = "flex";
    } else if (filter === "temple" && (
        title.includes("gwk") ||
        title.includes("pura") ||
        title.includes("tanah lot")
    )) {
        card.style.display = "flex";
    } else {
        card.style.display = "none";
    }
    });
});
});
});
