const allRecipesSection = document.getElementById("allRecipes");
const hamburger = document.getElementById("hamburger");
const dropdown = document.getElementById("dropdown");
const openSearch = document.getElementById("openSearch");
const searchSection = document.getElementById("search");

// Render all recipes as grid cards
function renderAllRecipes() {
  allRecipesSection.innerHTML = "";

  recipes.forEach(recipe => {
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

renderAllRecipes();

// Toggle dropdown menu
hamburger.addEventListener("click", () => {
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Click "Find a Recipe" in dropdown
openSearch.addEventListener("click", (e) => {
  e.preventDefault();
  searchSection.style.display = "block";
  dropdown.style.display = "none";
  window.scrollTo({ top: searchSection.offsetTop, behavior: 'smooth' });
});
