document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.getElementsByClassName("btn");

  if (buttons.length > 0) {
    // 🔹 You're on recipe cards page
    Array.from(buttons).forEach((button) => {
      button.addEventListener("click", function () {
        localStorage.setItem("selectedRecipe", this.id);
        localStorage.removeItem("recipeId"); // Clear search key
        localStorage.setItem("fromSearch", "false");
      });
    });
  } else {
    // 🔹 You're on recipe display page (single recipe)
    const fromSearch = localStorage.getItem("fromSearch") === "true";
    const recipeId = fromSearch
      ? localStorage.getItem("recipeId")
      : localStorage.getItem("selectedRecipe");

    const allRecipes = {
      ...breakfastrecipes,
      ...lunchdinnerrecipes,
      ...dessertrecipes,
    };

    if (recipeId && allRecipes[recipeId]) {
      const matchedRecipe = allRecipes[recipeId];

      document.querySelector("#title h2").innerText = matchedRecipe.title;
      document.querySelector("#ingredients p").innerHTML =
        "<ul>" +
        matchedRecipe.ingredients.map((i) => `<li>${i}</li>`).join("") +
        "</ul>";

      document.querySelector("#steps p").innerHTML =
        "<ol>" +
        matchedRecipe.steps.map((s) => `<li>${s}</li>`).join("") +
        "</ol>";

      document.title = matchedRecipe.title;
    } else {
      const container =
        document.querySelector(".card-container") || document.body;
      container.innerHTML = "<p>No recipe selected or recipe not found.</p>";
    }
  }
});
