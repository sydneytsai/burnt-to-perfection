"use client";  // Marking this as a client-side component

import Navbar from "@/components/Navbar";
import { useState } from "react";
import Link from "next/link";

export default function Recipes() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-4xl font-bold">Recipes</h1>
      </section>
      </main>
  )
}