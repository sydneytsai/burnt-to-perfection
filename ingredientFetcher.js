// ingredientFetcher.js — shared utility
// Fetches a recipe's HTML page and scrapes all <li> items under any
// <h2> whose text contains "ingredient". Results are cached per session
// so each page is only fetched once, even if used by multiple features.
//
// Ingredient format expected: "oil (2 tbsp)" — amount is in parentheses.
// The clean name is everything before the parentheses.

const ingredientCache = {};

// Strips the parenthesised measurement from an ingredient string.
// e.g. "soy sauce (1 tbsp)" -> "soy sauce"
//      "eggs (2)"           -> "eggs"
//      "oil"                -> "oil"  (no parens — left as-is)
function stripMeasurement(text) {
  return text.replace(/\s*\(.*?\)\s*/g, "").trim();
}

async function getIngredients(recipe) {
  if (ingredientCache[recipe.url]) return ingredientCache[recipe.url];

  try {
    const res = await fetch(recipe.url);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const raw   = []; // full text — used for ingredient-based search matching
    const clean = []; // measurement-stripped — used for grocery list

    doc.querySelectorAll("[hidden] h2, [aria-hidden='true'] h2").forEach(h2 => {
      if (/ingredient/i.test(h2.textContent)) {
        let el = h2.nextElementSibling;
        while (el) {
          if (el.tagName === "UL") {
            el.querySelectorAll("li").forEach(li => {
              const text = li.textContent.trim().toLowerCase();
              if (text && !raw.includes(text)) {
                raw.push(text);
                clean.push(stripMeasurement(text));
              }
            });
            break;
          }
          if (el.tagName === "H2" || el.tagName === "H3") break;
          el = el.nextElementSibling;
        }
      }
    });

    ingredientCache[recipe.url] = { raw, clean };
    return ingredientCache[recipe.url];
  } catch (err) {
    console.warn(`Could not fetch ingredients for ${recipe.name}:`, err);
    return { raw: [], clean: [] };
  }
}
