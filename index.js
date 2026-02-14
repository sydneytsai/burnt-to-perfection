const allRecipesSection = document.getElementById("allRecipes");
const categoryTabs = document.querySelectorAll(".tab"); // only category tabs

// Function to render recipes by category
function renderRecipes(category = "all") {
  allRecipesSection.innerHTML = "";

  const filteredRecipes = category === "all"
    ? recipes
    : recipes.filter(recipe => recipe.type === category);

  filteredRecipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <a href="${recipe.url}">
        <img src="${recipe.image}" alt="${recipe.name}">
        <div class="recipe-info">
          <h3>${recipe.name}</h3>
        </div>
      </a>
    `;

    allRecipesSection.appendChild(card);
  });
}

// Initial render
renderRecipes();

// Handle in-page category tabs
categoryTabs.forEach(tab => {
  tab.addEventListener("click", (e) => {
    e.preventDefault(); // only for category tabs

    // Remove 'active' from all category tabs
    categoryTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // Render selected category
    const category = tab.dataset.category || "all";
    renderRecipes(category);

    // Scroll smoothly to recipe section
    allRecipesSection.scrollIntoView({ behavior: "smooth" });
  });
});
