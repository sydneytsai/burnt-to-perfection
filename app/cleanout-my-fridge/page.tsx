// app/cleanout-my-fridge/page.tsx
import Navbar from "@/components/Navbar";

export default function CleanoutMyFridge() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow flex items-center justify-center text-center space-y-6">
        <h1 className="text-4xl font-bold">Cleanout My Fridge</h1>
        <p>Let's see what we can make with the ingredients in your fridge!</p>
        {/* Add more content for Cleanout My Fridge here */}
      </section>
    </main>
  );
}
