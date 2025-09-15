// Search & Filter Functionality
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const cards = document.querySelectorAll(".card");

function filterDestinations() {
  const searchText = searchInput.value.toLowerCase();
  const category = filterCategory.value;

  cards.forEach(card => {
    const title = card.querySelector("h3").innerText.toLowerCase();
    const cardCategory = card.getAttribute("data-category");

    if (
      (title.includes(searchText) || searchText === "") &&
      (category === "all" || category === cardCategory)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

searchInput.addEventListener("input", filterDestinations);
filterCategory.addEventListener("change", filterDestinations);
