// app/recipes/page.tsx
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getAllRecipes } from "@/lib/recipes";

export default function RecipesPage() {
  const recipes = getAllRecipes();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-4xl font-bold">Recipes</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link key={recipe.slug} href={`/recipes/${recipe.slug}`}>
              <div className="max-w-xs w-full cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{recipe.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
