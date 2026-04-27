// mealPrep.js — relies on getIngredients() from ingredientFetcher.js

document.addEventListener("DOMContentLoaded", () => {
  recipes.forEach((recipe, index) => recipe.id = index);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const calendar = document.getElementById("calendar");
  let selectedRecipeId = null;

  const checkedItems = {};

  // Build weekly calendar columns
  days.forEach(day => {
    const column = document.createElement("div");
    column.className = "day-column";
    column.setAttribute("role", "region");
    column.setAttribute("aria-label", day);
    column.innerHTML = `<h3>${day}</h3><p class="drop-hint">Drop here</p>`;
    calendar.appendChild(column);
    enableDrop(column);

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

      card.addEventListener("dragstart", e => { e.dataTransfer.setData("id", recipe.id); clearSelection(); });
      card.addEventListener("click", () => toggleSelection(card, recipe.id));
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleSelection(card, recipe.id); }
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

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderRecipeList(btn.dataset.type);
      clearSelection();
    });
  });

  function enableDrop(column) {
    column.addEventListener("dragover", e => { e.preventDefault(); column.classList.add("drag-over"); });
    column.addEventListener("dragleave", () => column.classList.remove("drag-over"));
    column.addEventListener("drop", e => {
      e.preventDefault();
      column.classList.remove("drag-over");
      addPlannedRecipe(column, e.dataTransfer.getData("id"));
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

    const hint = column.querySelector(".drop-hint");
    if (hint) hint.style.display = "none";
    column.appendChild(planned);
    updateGroceryList();
  }

  document.getElementById("clearWeekBtn").addEventListener("click", () => {
    document.querySelectorAll(".planned-recipe").forEach(el => el.remove());
    document.querySelectorAll(".drop-hint").forEach(el => el.style.display = "");
    Object.keys(checkedItems).forEach(k => delete checkedItems[k]);
    updateGroceryList();
  });

  // ── Grocery list ────────────────────────────────────────────────────────────
  // Uses getIngredients() from ingredientFetcher.js.
  // Uses the `clean` array (measurement-stripped) for display.
  // Deduplicates by ingredient name.

  async function updateGroceryList() {
    const groceryList  = document.getElementById("groceryItems");
    const groceryEmpty = document.getElementById("groceryEmpty");
    const plannedItems = document.querySelectorAll(".planned-recipe");

    if (plannedItems.length === 0) {
      groceryList.innerHTML = "";
      groceryEmpty.style.display = "";
      return;
    }

    groceryEmpty.style.display = "none";
    groceryList.innerHTML = "<li style='color:var(--text-light);font-style:italic;grid-column:1/-1'>Loading ingredients…</li>";

    const counts = {};
    await Promise.all(
      Array.from(plannedItems).map(async item => {
        const recipe = recipes.find(r => r.id == item.dataset.id);
        if (!recipe) return;
        const { clean } = await getIngredients(recipe); // measurement-stripped names
        clean.forEach(name => {
          if (!name) return;
          counts[name] = (counts[name] || 0) + 1;
        });
      })
    );

    // Drop checked state for ingredients no longer in the list
    Object.keys(checkedItems).forEach(k => { if (!counts[k]) delete checkedItems[k]; });

    renderGroceryChecklist(counts, groceryList);
  }

  function renderGroceryChecklist(counts, groceryList) {
    groceryList.innerHTML = "";

    const allItems = Object.entries(counts).sort(([a], [b]) => a.localeCompare(b));
    const unchecked = allItems.filter(([key]) => !checkedItems[key]);
    const checked   = allItems.filter(([key]) =>  checkedItems[key]);

    [...unchecked, ...checked].forEach(([key, count]) => {
      const isChecked = !!checkedItems[key];
      // Show "(2)" when an ingredient appears in more than one planned recipe
      const label   = count > 1 ? `${key} (${count})` : key;
      const checkId = `grocery-${key.replace(/\W+/g, "-")}`;

      const li = document.createElement("li");
      li.className = isChecked ? "grocery-item grocery-item--checked" : "grocery-item";
      li.innerHTML = `
        <label class="grocery-label" for="${checkId}">
          <input type="checkbox" id="${checkId}" class="grocery-checkbox" ${isChecked ? "checked" : ""} aria-label="${label}">
          <span class="grocery-checkmark"></span>
          <span class="grocery-text">${label}</span>
        </label>
      `;

      li.querySelector(".grocery-checkbox").addEventListener("change", (e) => {
        checkedItems[key] = e.target.checked;
        renderGroceryChecklist(getCurrentCounts(), document.getElementById("groceryItems"));
      });

      groceryList.appendChild(li);
    });
  }

  function getCurrentCounts() {
    const counts = {};
    document.querySelectorAll(".planned-recipe").forEach(item => {
      const recipe = recipes.find(r => r.id == item.dataset.id);
      if (!recipe) return;
      const cached = ingredientCache[recipe.url];
      if (!cached) return;
      cached.clean.forEach(name => {
        if (!name) return;
        counts[name] = (counts[name] || 0) + 1;
      });
    });
    return counts;
  }

  // Mobile hamburger
  const hamburger = document.getElementById("hamburger");
  const pageNav   = document.getElementById("pageNav");
  hamburger?.addEventListener("click", () => {
    pageNav.classList.toggle("open");
    hamburger.classList.toggle("open");
  });
});
