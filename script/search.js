document.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.getElementById("search-results");
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query")?.toLowerCase() || "";

  const searchInput = document.getElementById("search-input");
  searchInput.value = query;

  function renderResults(keyword) {
    resultsContainer.innerHTML = "";

    const filtered = searchData.filter((item) =>
      item.title.toLowerCase().includes(keyword) ||
      item.subtitle.toLowerCase().includes(keyword)
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `<p style="text-align:center;">No results found for "${keyword}".</p>`;
      return;
    }

    filtered.forEach((item) => {
      const card = document.createElement("div");
      card.className = "result-card";
      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.subtitle}</p>
        <a href="${item.url}" class="btn-view">View Details</a>
      `;
      resultsContainer.appendChild(card);
    });
  }

  renderResults(query);

  // Re-search when typing in search.html
  document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const newQuery = searchInput.value.trim().toLowerCase();
    if (newQuery) {
      renderResults(newQuery);
      window.history.replaceState({}, "", `?query=${encodeURIComponent(newQuery)}`);
    }
  });
});
