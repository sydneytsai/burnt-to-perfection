const ingredientInput = document.getElementById("ingredientInput");
const ingredientTagsContainer = document.getElementById("ingredientTags");
const searchBtn = document.getElementById("searchBtn");
const typeSelect = document.getElementById("typeSelect");
const searchResultsSection = document.getElementById("searchResults");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const backBtn = document.getElementById("backBtn");

let ingredients = []; // array of added ingredients

// Add ingredient when pressing Enter
ingredientInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && ingredientInput.value.trim() !== "") {
    e.preventDefault();
    const ingredient = ingredientInput.value.trim().toLowerCase();
    if (!ingredients.includes(ingredient)) {
      ingredients.push(ingredient);
      renderIngredients();
    }
    ingredientInput.value = "";
  }
});

// Render ingredient tags
function renderIngredients() {
  ingredientTagsContainer.innerHTML = "";
  ingredients.forEach((ing, index) => {
    const tag = document.createElement("div");
    tag.className = "ingredient-tag";
    tag.innerHTML = `${ing} <span data-index="${index}">&times;</span>`;
    ingredientTagsContainer.appendChild(tag);
  });

  // Remove ingredient on X click
  document.querySelectorAll(".ingredient-tag span").forEach(span => {
    span.addEventListener("click", (e) => {
      const i = parseInt(span.getAttribute("data-index"));
      ingredients.splice(i, 1);
      renderIngredients();
    });
  });
}

// SEARCH BUTTON — filter recipes
searchBtn.addEventListener("click", () => {
  const selectedType = typeSelect.value;
  const results = recipes.filter(recipe => {
    // Filter by dish type
    const typeMatch = selectedType === "any" || recipe.type === selectedType;

    // Filter by ingredients (recipe must contain ALL entered ingredients)
    const ingredientsMatch = ingredients.every(ing =>
      recipe.ingredients.includes(ing)
    );

    return typeMatch && ingredientsMatch;
  });

  renderSearchResults(results);
});

// Render filtered recipes as grid cards
function renderSearchResults(results) {
  searchResultsSection.innerHTML = "";

  if (results.length === 0) {
    searchResultsSection.innerHTML = "<p>No recipes found</p>";
    return;
  }

  results.forEach(recipe => {
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

    searchResultsSection.appendChild(card);
  });
}

clearSearchBtn.addEventListener("click", () => {
  ingredients = [];
  renderIngredients();
  ingredientInput.value = "";
  typeSelect.value = "any";
  searchResultsSection.innerHTML = "";
  searchResultsSection.style.display = "none";
  allRecipesSection.style.display = "grid";
});

backBtn.addEventListener("click", () => {
    // Go back to the main page
    window.location.href = "index.html"; // or your main grid page
});