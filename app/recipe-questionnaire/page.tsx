// app/recipe-questionnaire/page.tsx
import Navbar from "@/components/Navbar";

export default function RecipeQuestionnaire() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow flex items-center justify-center text-center space-y-6">
        <h1 className="text-4xl font-bold">Recipe Questionnaire</h1>
        <p>Help us personalize your recipe recommendations by filling out the questionnaire!</p>
        
        {/* Add a form or questions for the questionnaire */}
      </section>
    </main>
  );
}
