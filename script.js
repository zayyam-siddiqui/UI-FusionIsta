// =====================Navbar=====================
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  // Toggle hamburger main menu
  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    navLinks.classList.toggle("show");
  });

  // Close both menus if clicked outside
  document.addEventListener("click", function (e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("show");
    }
  });
});
// =====================Navbar=====================
// =====================OpeningPages=====================
document.querySelectorAll(".category-outer").forEach((card) => {
  card.addEventListener("click", () => {
    const url = card.getAttribute("data-link");
    if (url) {
      window.location.href = url;
    }
  });
});
// =====================OpeningPages=====================
// =====================SearchPages=====================

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".search").addEventListener("submit", function (e) {
    e.preventDefault();

    const searchTerm = document
      .querySelector('input[name="q"]')
      .value.toLowerCase();
    let found = false;
    let matchedKey = "";
    let matchedCategory = "";

    const allRecipes = [
      { data: breakfastrecipes, category: "breakfast" },
      { data: lunchdinnerrecipes, category: "lunchdinner" },
      { data: dessertrecipes, category: "dessert" },
    ];

    for (const group of allRecipes) {
      for (const key in group.data) {
        const titleWords = group.data[key].title.toLowerCase().split(" ");
        const searchWords = searchTerm.split(" ");
        const hasMatch = searchWords.some((word) => titleWords.includes(word));

        if (hasMatch) {
          matchedKey = key;
          matchedCategory = group.category;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (found) {
      localStorage.setItem("searchResultKey", matchedKey);
      localStorage.setItem("searchResultCategory", matchedCategory);
      window.location.href = "Search/index.html";
    } else {
      alert("No recipe found with that name.");
    }
  });
});
// =====================SearchPages=====================
