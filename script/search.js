document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("query")?.toLowerCase() || "";
  const searchInput = document.getElementById("search-input");
  const resultsContainer = document.getElementById("search-results");

  searchInput.value = query;

  // File kategori yang akan dibaca
  const files = ["alam.html", "budaya.html", "gunung.html", "desa.html"];

  if (query) {
    searchAcrossFiles(query);
  }

  // Fungsi utama search
  async function searchAcrossFiles(keyword) {
    resultsContainer.innerHTML = "<p>Loading results...</p>";

    const matches = [];

    for (const file of files) {
      try {
        const response = await fetch(file);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Ambil semua konten yang punya h1
        const sections = doc.querySelectorAll(".left-content, .right-content");
        sections.forEach((section) => {
          const text = section.innerText.toLowerCase();
          if (text.includes(keyword)) {
            matches.push({
              title: section.querySelector("h1")?.textContent || "No title",
              desc: section.querySelector("p")?.textContent || "",
              img: section.querySelector("img")?.getAttribute("src") || "asset/img/default.jpg",
              source: file,
            });
          }
        });
      } catch (err) {
        console.error(`Failed to fetch ${file}:`, err);
      }
    }

    displayResults(matches, keyword);
  }

  // Tampilkan hasil
  function displayResults(matches, keyword) {
    if (matches.length === 0) {
      resultsContainer.innerHTML = `<p>No results found for "<strong>${keyword}</strong>"</p>`;
      return;
    }

    resultsContainer.innerHTML = matches.map(match => `
      <div class="result-card">
        <img src="${match.img}" alt="${match.title}">
        <h2>${match.title}</h2>
        <p>${match.desc}</p>
        <small>From: ${match.source}</small>
      </div>
    `).join("");
  }

  // Search ulang dari search bar
  const form = document.getElementById("search-bar");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newQuery = searchInput.value.trim();
    if (newQuery) {
      window.location.href = `search.html?query=${encodeURIComponent(newQuery)}`;
    }
  });
});
