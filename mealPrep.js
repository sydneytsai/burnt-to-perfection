document.addEventListener("DOMContentLoaded", () => {
  recipes.forEach((recipe, index) => recipe.id = index);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const calendar = document.getElementById("calendar");
  let selectedRecipeId = null; // for click-to-assign

  // Build weekly calendar columns
  days.forEach(day => {
    const column = document.createElement("div");
    column.className = "day-column";
    column.setAttribute("role", "region");
    column.setAttribute("aria-label", day);
    column.innerHTML = `
      <h3>${day}</h3>
      <p class="drop-hint">Drop here</p>
    `;
    calendar.appendChild(column);
    enableDrop(column);

    // Click-to-assign: click a day column to place selected recipe
    column.addEventListener("click", (e) => {
      if (e.target.classList.contains("planned-recipe") || e.target.closest(".planned-recipe")) return;
      if (selectedRecipeId === null) return;
      addPlannedRecipe(column, selectedRecipeId);
      clearSelection();
    });
  });

  const recipeList = document.getElementById("recipeList");

  function renderRecipeList(filter = "all") {
    recipeList.innerHTML = "";
    const filtered = filter === "all" ? recipes : recipes.filter(r => r.type === filter);

    filtered.forEach(recipe => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.draggable = true;
      card.dataset.id = recipe.id;
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `${recipe.name} — drag or press Enter to select`);
      card.innerHTML = `<div class="recipe-info"><h3>${recipe.name}</h3><span class="recipe-type-badge">${recipe.type}</span></div>`;

      // Drag
      card.addEventListener("dragstart", e => {
        e.dataTransfer.setData("id", recipe.id);
        clearSelection();
      });

      // Click-to-assign selection
      card.addEventListener("click", () => toggleSelection(card, recipe.id));
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleSelection(card, recipe.id);
        }
      });

      recipeList.appendChild(card);
    });
  }

  function toggleSelection(card, id) {
    const alreadySelected = selectedRecipeId === id;
    clearSelection();
    if (!alreadySelected) {
      selectedRecipeId = id;
      card.classList.add("selected");
      card.setAttribute("aria-pressed", "true");
    }
  }

  function clearSelection() {
    selectedRecipeId = null;
    document.querySelectorAll("#recipeList .recipe-card.selected").forEach(c => {
      c.classList.remove("selected");
      c.setAttribute("aria-pressed", "false");
    });
  }

  renderRecipeList();

  // Filter buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderRecipeList(btn.dataset.type);
      clearSelection();
    });
  });

  // Drag & drop
  function enableDrop(column) {
    column.addEventListener("dragover", e => { e.preventDefault(); column.classList.add("drag-over"); });
    column.addEventListener("dragleave", () => column.classList.remove("drag-over"));
    column.addEventListener("drop", e => {
      e.preventDefault();
      column.classList.remove("drag-over");
      const id = e.dataTransfer.getData("id");
      addPlannedRecipe(column, id);
    });
  }

  function addPlannedRecipe(column, id) {
    const recipe = recipes.find(r => r.id == id);
    if (!recipe) return;

    const planned = document.createElement("div");
    planned.className = "planned-recipe";
    planned.dataset.id = recipe.id;
    planned.setAttribute("tabindex", "0");
    planned.setAttribute("aria-label", `${recipe.name} — click to remove`);
    planned.innerHTML = `
      <span class="planned-name">${recipe.name}</span>
      <button class="remove-btn" aria-label="Remove ${recipe.name}">✕</button>
    `;

    planned.querySelector(".remove-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      planned.remove();
      updateGroceryList();
    });

    // Hide drop hint once something is placed
    const hint = column.querySelector(".drop-hint");
    if (hint) hint.style.display = "none";

    column.appendChild(planned);
    updateGroceryList();
  }

  // Clear week button
  document.getElementById("clearWeekBtn").addEventListener("click", () => {
    document.querySelectorAll(".planned-recipe").forEach(el => el.remove());
    document.querySelectorAll(".drop-hint").forEach(el => el.style.display = "");
    updateGroceryList();
  });

  // Grocery list
  function updateGroceryList() {
    const grocery = {};
    document.querySelectorAll(".planned-recipe").forEach(item => {
      const recipe = recipes.find(r => r.id == item.dataset.id);
      if (!recipe) return;
      recipe.ingredients.forEach(ingredient => {
        const key = ingredient.toLowerCase();
        grocery[key] = (grocery[key] || 0) + 1;
      });
    });

    const groceryList = document.getElementById("groceryItems");
    const groceryEmpty = document.getElementById("groceryEmpty");
    groceryList.innerHTML = "";

    if (Object.keys(grocery).length === 0) {
      groceryEmpty.style.display = "";
      return;
    }

    groceryEmpty.style.display = "none";
    Object.entries(grocery).sort().forEach(([name, count]) => {
      const li = document.createElement("li");
      li.textContent = count > 1 ? `${name} (×${count})` : name;
      groceryList.appendChild(li);
    });
  }

  // Mobile hamburger
  const hamburger = document.getElementById("hamburger");
  const pageNav = document.getElementById("pageNav");
  hamburger?.addEventListener("click", () => {
    pageNav.classList.toggle("open");
    hamburger.classList.toggle("open");
  });
});
