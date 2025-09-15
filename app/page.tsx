// app/page.tsx (Homepage)
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Centered Title */}
      <section className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Burnt To Perfection
        </h1>
      </section>
    </main>
  );
}
