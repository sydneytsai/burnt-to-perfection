// app/recipes/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getRecipeBySlug } from "@/lib/recipes";
import Navbar from "@/components/Navbar";
import { remark } from "remark";
import html from "remark-html";

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = getRecipeBySlug(params.slug);
  if (!recipe) return notFound();

  const processedContent = await remark().use(html).process(recipe.content);
  const contentHtml = processedContent.toString();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="p-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">{recipe.title}</h1>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover mt-4 rounded"
        />
        <p className="mt-4 text-lg">{recipe.description}</p>

        <h2 className="mt-6 text-2xl font-semibold">Ingredients</h2>
        <ul className="list-disc list-inside mt-2 text-left">
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>

        <h2 className="mt-6 text-2xl font-semibold">Steps</h2>
        <ol className="list-decimal list-inside mt-2 text-left">
          {recipe.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        <div
          className="prose prose-lg mt-8"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </section>
    </main>
  );
}
