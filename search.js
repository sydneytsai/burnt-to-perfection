const ingredientInput = document.getElementById("ingredientInput");
const ingredientTagsContainer = document.getElementById("ingredientTags");
const searchBtn = document.getElementById("searchBtn");
const typeSelect = document.getElementById("typeSelect");
const searchResultsSection = document.getElementById("searchResults");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const resultMeta = document.getElementById("resultMeta");

let ingredients = [];
let hasSearched = false;

// Add ingredient on Enter
ingredientInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && ingredientInput.value.trim() !== "") {
    e.preventDefault();
    const ingredient = ingredientInput.value.trim().toLowerCase();
    if (!ingredients.includes(ingredient)) {
      ingredients.push(ingredient);
      renderIngredients();
    }
    ingredientInput.value = "";
    if (hasSearched) runSearch();
  }
});

// Live search on type select change
typeSelect.addEventListener("change", () => {
  if (hasSearched) runSearch();
});

function renderIngredients() {
  ingredientTagsContainer.innerHTML = "";
  ingredients.forEach((ing, index) => {
    const tag = document.createElement("div");
    tag.className = "ingredient-tag";
    tag.innerHTML = `${ing} <span data-index="${index}" aria-label="Remove ${ing}">&times;</span>`;
    ingredientTagsContainer.appendChild(tag);
  });

  document.querySelectorAll(".ingredient-tag span").forEach(span => {
    span.addEventListener("click", () => {
      ingredients.splice(parseInt(span.dataset.index), 1);
      renderIngredients();
      if (hasSearched) runSearch();
    });
  });
}

function runSearch() {
  hasSearched = true;
  const selectedType = typeSelect.value;

  const results = recipes.filter(recipe => {
    const typeMatch = selectedType === "any" || recipe.type === selectedType;
    const ingredientsMatch = ingredients.length === 0 || ingredients.every(ing =>
      recipe.ingredients.some(ri => ri.toLowerCase().includes(ing))
    );
    return typeMatch && ingredientsMatch;
  });

  renderSearchResults(results);
}

searchBtn.addEventListener("click", runSearch);

function renderSearchResults(results) {
  searchResultsSection.innerHTML = "";

  // Result count meta
  if (results.length === 0) {
    resultMeta.textContent = "";
    searchResultsSection.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🔍</span>
        <p>No recipes matched your search.</p>
        <p class="empty-sub">Try removing an ingredient or changing the dish type.</p>
      </div>`;
    return;
  }

  resultMeta.textContent = `${results.length} recipe${results.length !== 1 ? "s" : ""} found`;

  results.forEach(recipe => {
    // Find which searched ingredients matched
    const matchedIngredients = ingredients.filter(ing =>
      recipe.ingredients.some(ri => ri.toLowerCase().includes(ing))
    );

    const card = document.createElement("div");
    card.className = "recipe-card";

    const matchBadges = matchedIngredients.length > 0
      ? `<div class="match-badges">${matchedIngredients.map(m => `<span class="match-badge">✓ ${m}</span>`).join("")}</div>`
      : "";

    card.innerHTML = `
      <a href="${recipe.url}">
        <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
        <div class="recipe-info">
          <h3>${recipe.name}</h3>
          <span class="recipe-type-badge">${recipe.type}</span>
          ${matchBadges}
        </div>
      </a>`;

    searchResultsSection.appendChild(card);
  });
}

clearSearchBtn.addEventListener("click", () => {
  ingredients = [];
  hasSearched = false;
  renderIngredients();
  ingredientInput.value = "";
  typeSelect.value = "any";
  searchResultsSection.innerHTML = "";
  resultMeta.textContent = "";
});

// Mobile hamburger
const hamburger = document.getElementById("hamburger");
const pageNav = document.getElementById("pageNav");
hamburger?.addEventListener("click", () => {
  pageNav.classList.toggle("open");
  hamburger.classList.toggle("open");
});
