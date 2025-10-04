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
    } else if (filter === "beach" && title.includes("beach")) {
        card.style.display = "flex";
    } else if (filter === "rice" && title.includes("rice")) {
        card.style.display = "flex";
    } else if (filter === "waterfall" && title.includes("waterfall")) {
        card.style.display = "flex";
    } else {
        card.style.display = "none";
    }
    });
});
});
});
