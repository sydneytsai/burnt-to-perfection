// app/spin-a-meal/page.tsx
import Navbar from "@/components/Navbar";

export default function SpinAMeal() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow flex items-center justify-center text-center space-y-6">
        <h1 className="text-4xl font-bold">Spin-A-Meal</h1>
        <p>Spin the wheel and discover new meal ideas!</p>
        {/* Add more content for Spin-A-Meal here */}
      </section>
    </main>
  );
}
