"use client"; // Enable client-side hooks in Next.js

import React, { useState } from "react";
import Navbar from "@/components/Navbar";

export default function SpinAMeal() {
  const [recipes, setRecipes] = useState<string[]>([]);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [inputMeal, setinputMeal] = useState<string>("");
  const [isSpinning, setIsSpinning] = useState(false);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputMeal(e.target.value);
  };

  // Add recipe to wheel
  const addMeal = () => {
    if (inputMeal.trim()) {
      setRecipes([...recipes, inputMeal]);
      setinputMeal("");
    }
  };

  // Spin wheel
  const spinWheel = () => {
    if (recipes.length === 0) return;
    setIsSpinning(true);
    setSpinResult(null);

    setTimeout(() => {
      const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
      setSpinResult(randomRecipe);
      setIsSpinning(false);
    }, 2000);
  };

  // Clear wheel
  const clearWheel = () => {
    setRecipes([]);
    setSpinResult(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-white">
      <Navbar />

      <section className="flex-grow flex flex-col items-center justify-center text-center space-y-8 px-6 py-12">
        <h1 className="text-4xl font-bold text-black">Spin-A-Meal</h1>
        <p className="text-lg text-gray-600">
          Spin the wheel to choose your next meal!
        </p>

        {/* Input */}
        <div className="flex flex-col items-center space-y-4 w-full max-w-md">
          <div className="flex space-x-2 w-full">
            <input
              type="text"
              value={inputMeal}
              onChange={handleInputChange}
              className="px-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
              placeholder="Add a new meal"
            />
            <button
              onClick={addMeal}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Add Meal
            </button>
          </div>
        </div>

        {/* Wheel */}
        <div className="mt-8 relative">
          <div
            className={`wheel w-96 h-96 rounded-full border-8 border-gradient-to-r from-blue-500 to-indigo-600 shadow-2xl relative transition-transform duration-1000 ${
              isSpinning ? "animate-spin" : ""
            }`}
            style={{
              transform: isSpinning ? "rotate(3600deg)" : "rotate(0deg)",
            }}
          >
            {/* Labels */}
            {recipes.map((recipe, index) => {
              const angle = (360 / recipes.length) * index;
              return (
                <div
                  key={index}
                  className="absolute font-semibold text-black"
                  style={{
                    top: "45%",
                    left: "42%",
                    transform: `
                      rotate(${angle}deg)
                      translateY(-140px)  /* move label out from center */
                      rotate(-${angle}deg)
                    `,
                    transformOrigin: "center center",
                  }}
                >
                  {recipe}
                </div>
              );
            })}
            {/* Spin result in center */}
            {spinResult && !isSpinning && (
              <div className="absolute text-xl font-semibold text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <p>{spinResult}</p>
              </div>
            )}
          </div>

          {/* Arrow */}
          <div
            className="absolute top-0 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-transparent border-t-[#ff4500]"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={spinWheel}
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            disabled={isSpinning || recipes.length === 0}
          >
            {isSpinning ? "Spinning..." : "Spin the Wheel!"}
          </button>

          <button
            onClick={clearWheel}
            className="px-8 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
            disabled={recipes.length === 0}
          >
            Clear the Wheel
          </button>
        </div>
      </section>
    </main>
  );
}
