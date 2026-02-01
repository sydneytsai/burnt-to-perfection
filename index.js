const allRecipesSection = document.getElementById("allRecipes");
const tabs = document.querySelectorAll(".tab");

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

tabs.forEach(tab => {
  tab.addEventListener("click", (e) => {
    // If this tab is an external link, allow default navigation
    if (tab.getAttribute("href") === "search.html") return;

    // Otherwise, prevent default and handle as a category tab
    e.preventDefault();

    // Remove 'active' from all tabs
    tabs.forEach(t => t.classList.remove("active"));

    // Add 'active' to clicked tab
    tab.classList.add("active");

    // Render recipes for the selected category
    const category = tab.dataset.category || "all"; // fallback to 'all'
    renderRecipes(category);

    // Smooth scroll to recipe section
    allRecipesSection.scrollIntoView({ behavior: "smooth" });
  });
});