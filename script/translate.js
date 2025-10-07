document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("languageSelect");

  // Default language
  const defaultLang = "en";
  languageSelect.value = defaultLang;
  loadLanguage(defaultLang);

  // Mapping antara nama file HTML dan key halaman di JSON
  const pageMap = {
    index: "index",
    alam: "nature",
    budaya: "culture",
    desa: "village",
    gunung: "mountain"
  };

  async function loadLanguage(lang) {
    try {
      // Ambil path halaman aktif
      const path = window.location.pathname;
      const pageName = path.split("/").pop().replace(".html", "") || "index";
      const pageKey = pageMap[pageName] || "index";

      // Fetch file JSON bahasa
      const response = await fetch(`script/lang/${lang}.json`);
      const data = await response.json();

      const pageData = data[pageKey];
      if (!pageData) {
        console.warn(`⚠️ No translation found for page: ${pageKey}`);
        return;
      }

      // Update semua elemen dengan data-key
      document.querySelectorAll("[data-key]").forEach((el) => {
        const key = el.getAttribute("data-key");
        const keys = key.split(".");
        let value = pageData;

        // Telusuri struktur nested JSON
        for (const k of keys) {
          value = value ? value[k] : null;
        }

        if (value) {
          el.innerHTML = value;
        }
      });

      console.log(`Loaded language: ${lang} for page: ${pageKey}`);
    } catch (err) {
      console.error("Error loading language file:", err);
    }
  }

  // Event listener untuk dropdown
  languageSelect.addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem("preferredLang", selectedLang);
    loadLanguage(selectedLang);
  });

  // Load preferred language kalau sebelumnya pernah diganti
  const savedLang = localStorage.getItem("preferredLang");
  if (savedLang && savedLang !== defaultLang) {
    languageSelect.value = savedLang;
    loadLanguage(savedLang);
  }
});
