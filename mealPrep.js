document.addEventListener("DOMContentLoaded", () => {
  recipes.forEach((recipe, index) => recipe.id = index);

  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const calendar = document.getElementById("calendar");

  days.forEach(day => {
    const column = document.createElement("div");
    column.className = "day-column";
    column.innerHTML = `<h3>${day}</h3>`;
    calendar.appendChild(column);
    enableDrop(column);
  });

  const recipeList = document.getElementById("recipeList");

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.draggable = true;
    card.dataset.id = recipe.id;
    card.innerHTML = `<div class="recipe-info"><h3>${recipe.name}</h3></div>`;
    card.addEventListener("dragstart", e => e.dataTransfer.setData("id", recipe.id));
    recipeList.appendChild(card);
  });

  function enableDrop(column) {
    column.addEventListener("dragover", e => { e.preventDefault(); column.classList.add("drag-over"); });
    column.addEventListener("dragleave", () => column.classList.remove("drag-over"));
    column.addEventListener("drop", e => {
      e.preventDefault();
      column.classList.remove("drag-over");
      const id = e.dataTransfer.getData("id");
      const recipe = recipes.find(r => r.id == id);
      if (!recipe) return;
      const planned = document.createElement("div");
      planned.className = "planned-recipe";
      planned.dataset.id = recipe.id;
      planned.textContent = recipe.name;
      planned.addEventListener("click", () => { planned.remove(); updateGroceryList(); });
      column.appendChild(planned);
      updateGroceryList();
    });
  }

  function updateGroceryList() {
    const grocery = {};
    document.querySelectorAll(".planned-recipe").forEach(item => {
      const recipe = recipes.find(r => r.id == item.dataset.id);
      if (!recipe) return;
      recipe.ingredients.forEach(ingredient => {
        const normalized = ingredient.toLowerCase();
        grocery[normalized] = grocery[normalized] ? grocery[normalized]+1 : 1;
      });
    });
    const groceryList = document.getElementById("groceryItems");
    groceryList.innerHTML = "";
    Object.entries(grocery).sort().forEach(([name, count]) => {
      const li = document.createElement("li");
      li.textContent = count > 1 ? `${name} (${count})` : name;
      groceryList.appendChild(li);
    });
  }
});
