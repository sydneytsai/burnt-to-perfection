const allRecipesSection = document.getElementById("allRecipes");
const categoryTabs = document.querySelectorAll(".category-nav .tab");

// Populate count badges
function renderCounts() {
  const categories = ["all", "main", "side", "dessert"];
  categories.forEach(cat => {
    const el = document.getElementById(`count-${cat}`);
    if (!el) return;
    const count = cat === "all" ? recipes.length : recipes.filter(r => r.type === cat).length;
    el.textContent = count;
  });
}

// Render recipes by category with empty state
function renderRecipes(category = "all") {
  allRecipesSection.innerHTML = "";

  const filtered = category === "all"
    ? recipes
    : recipes.filter(r => r.type === category);

  if (filtered.length === 0) {
    allRecipesSection.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🍽️</span>
        <p>No recipes here yet!</p>
      </div>`;
    return;
  }

  filtered.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <a href="${recipe.url}">
        <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
        <div class="recipe-info">
          <h3>${recipe.name}</h3>
          <span class="recipe-type-badge">${recipe.type}</span>
        </div>
      </a>`;
    allRecipesSection.appendChild(card);
  });
}

// Init
renderCounts();
renderRecipes();

// Category tab switching
categoryTabs.forEach(tab => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();
    categoryTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderRecipes(tab.dataset.category);
    allRecipesSection.scrollIntoView({ behavior: "smooth" });
  });
});

// Mobile hamburger
const hamburger = document.getElementById("hamburger");
const pageNav = document.getElementById("pageNav");
hamburger?.addEventListener("click", () => {
  pageNav.classList.toggle("open");
  hamburger.classList.toggle("open");
});
