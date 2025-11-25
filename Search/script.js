const key = localStorage.getItem("searchResultKey");
const category = localStorage.getItem("searchResultCategory");

let recipe = null;
if (category === "breakfast") {
  recipe = breakfastrecipes[key];
} else if (category === "lunchdinner") {
  recipe = lunchdinnerrecipes[key];
} else if (category === "dessert") {
  recipe = dessertrecipes[key];
}

if (recipe) {
  const container = document.querySelector(".card-container");
  const card = document.createElement("div");
  card.className = "card";
  // card.data-link = key;

  // Capitalize first letter of title if needed
  const formattedTitle =
    recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1);

  console.log(
    "Image trying to load:",
    `../Images/${category}/${recipe.title.replace(/\s+/g, "")}.jpg`
  );

  // Construct the card HTML
  card.innerHTML = `
    <div class="card-inner">
      <img src="../Images/${category}/${recipe.title.replace(
    /\s+/g,
    ""
  )}.jpg" alt="${recipe.title}" />
      <div class="card-content">
        <h3>${formattedTitle}</h3>
        <a href="#" class="btn read-more-btn" data-link="${key}">Read More</a>
      </div>
    </div>
  `;

  container.appendChild(card);
  const readMoreBtn = card.querySelector(".read-more-btn");
  readMoreBtn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.setItem("recipeId", this.dataset.link);
    localStorage.setItem("recipeCategory", category);
    localStorage.removeItem("selectedRecipe"); // 🧹 remove other
    localStorage.setItem("fromSearch", "true");
    window.location.href = "../Recipies/index.html";
  });
} else {
  document.querySelector(".card-container").innerHTML =
    "<p>No result found.</p>";
}
//=======================
