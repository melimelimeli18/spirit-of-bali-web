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
    } 
    else if (filter === "easy" && title.includes("batur")) {
        card.style.display = "flex";
    } 
    else if (filter === "medium" && title.includes("batukaru")) {
        card.style.display = "flex";
    } 
    else if (filter === "hard" && title.includes("agung")) {
        card.style.display = "flex";
    } 
    else {
        card.style.display = "none";
    }
    });
});
});
});
