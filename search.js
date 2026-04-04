const ingredientInput = document.getElementById("ingredientInput");
const ingredientTagsContainer = document.getElementById("ingredientTags");
const searchBtn = document.getElementById("searchBtn");
const typeSelect = document.getElementById("typeSelect");
const searchResultsSection = document.getElementById("searchResults");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const resultMeta = document.getElementById("resultMeta");

let ingredients = [];
let hasSearched = false;

// Cache so each recipe HTML is only fetched once per session
const ingredientCache = {};

// Fetch a recipe's HTML and scrape all <li> inside ingredient <h2> sections
async function getIngredients(recipe) {
  if (ingredientCache[recipe.url]) return ingredientCache[recipe.url];

  try {
    const res = await fetch(recipe.url);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const found = [];
    doc.querySelectorAll("h2").forEach(h2 => {
      if (/ingredient/i.test(h2.textContent)) {
        // Walk siblings to find the next <ul>
        let el = h2.nextElementSibling;
        while (el) {
          if (el.tagName === "UL") {
            el.querySelectorAll("li").forEach(li => {
              const text = li.textContent.trim().toLowerCase();
              if (text && !found.includes(text)) found.push(text);
            });
            break;
          }
          if (el.tagName === "H2" || el.tagName === "H3") break;
          el = el.nextElementSibling;
        }
      }
    });

    ingredientCache[recipe.url] = found;
    return found;
  } catch (err) {
    console.warn(`Could not fetch ingredients for ${recipe.name}:`, err);
    return [];
  }
}

// ─── Ingredient tags UI ───────────────────────────────────────────────────────

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

// ─── Search ───────────────────────────────────────────────────────────────────

searchBtn.addEventListener("click", runSearch);

async function runSearch() {
  hasSearched = true;
  const selectedType = typeSelect.value;

  // Filter by type first (cheap, no fetch needed)
  const typeFiltered = recipes.filter(r =>
    selectedType === "any" || r.type === selectedType
  );

  // Show loading state
  searchResultsSection.innerHTML = `<div class="empty-state"><span class="empty-icon">⏳</span><p>Searching…</p></div>`;
  resultMeta.textContent = "";

  // If no ingredients entered, show all type-filtered results immediately
  if (ingredients.length === 0) {
    renderSearchResults(typeFiltered.map(r => ({ recipe: r, matched: [] })));
    return;
  }

  // Fetch ingredients for all type-filtered recipes in parallel
  const withIngredients = await Promise.all(
    typeFiltered.map(async recipe => {
      const recipeIngredients = await getIngredients(recipe);
      const matched = ingredients.filter(ing =>
        recipeIngredients.some(ri => ri.includes(ing))
      );
      const allMatch = ingredients.every(ing =>
        recipeIngredients.some(ri => ri.includes(ing))
      );
      return allMatch ? { recipe, matched } : null;
    })
  );

  const results = withIngredients.filter(Boolean);
  renderSearchResults(results);
}

// ─── Render results ───────────────────────────────────────────────────────────

function renderSearchResults(results) {
  searchResultsSection.innerHTML = "";

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

  results.forEach(({ recipe, matched }) => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    const matchBadges = matched.length > 0
      ? `<div class="match-badges">${matched.map(m => `<span class="match-badge">✓ ${m}</span>`).join("")}</div>`
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

// ─── Clear ────────────────────────────────────────────────────────────────────

clearSearchBtn.addEventListener("click", () => {
  ingredients = [];
  hasSearched = false;
  renderIngredients();
  ingredientInput.value = "";
  typeSelect.value = "any";
  searchResultsSection.innerHTML = "";
  resultMeta.textContent = "";
});

// ─── Mobile nav ───────────────────────────────────────────────────────────────

const hamburger = document.getElementById("hamburger");
const pageNav = document.getElementById("pageNav");
hamburger?.addEventListener("click", () => {
  pageNav.classList.toggle("open");
  hamburger.classList.toggle("open");
});