// components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-center space-x-10 py-4 text-sm">
      <Link href="/recipes">Recipes</Link>  {/* Link to /recipes */}
      <Link href="/interactive-cooking-lab">Interactive Cooking Lab</Link> {/* Link to /interactive-cooking-lab */}
    </nav>
  );
}
