// app/duo-dash-off/page.tsx
import Navbar from "@/components/Navbar";

export default function DuoDashOff() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow flex items-center justify-center text-center space-y-6">
        <h1 className="text-4xl font-bold">Duo Dash-Off</h1>
        <p>Welcome to the Duo Dash-Off challenge!</p>
        {/* Add more content for Duo Dash-Off here */}
      </section>
    </main>
  );
}
