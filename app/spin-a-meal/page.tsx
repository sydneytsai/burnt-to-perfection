"use client"; // Enable client-side hooks in Next.js

import React, { useState } from "react";
import Navbar from "@/components/Navbar";

export default function SpinAMeal() {
  // State to store recipes input by the user
  const [recipes, setRecipes] = useState<string[]>([]);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [inputRecipe, setInputRecipe] = useState<string>("");
  const [isSpinning, setIsSpinning] = useState(false);

  // Handle recipe input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRecipe(e.target.value);
  };

  // Handle adding recipe to the wheel
  const addRecipe = () => {
    if (inputRecipe.trim()) {
      setRecipes([...recipes, inputRecipe]);
      setInputRecipe(""); // Clear input field after adding
    }
  };

  // Handle spinning the wheel
  const spinWheel = () => {
    setIsSpinning(true);
    setSpinResult(null); // Reset the spin result while spinning

    // Simulate the spinning animation for 2 seconds
    setTimeout(() => {
      const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
      setSpinResult(randomRecipe);
      setIsSpinning(false);
    }, 2000); // Adjust the spin duration
  };

  // Clear all recipes from the wheel
  const clearWheel = () => {
    setRecipes([]);
    setSpinResult(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-white"> {/* White background */}
      <Navbar />
      <section className="flex-grow flex flex-col items-center justify-center text-center space-y-8 px-6 py-12">
        <h1 className="text-4xl font-bold text-black">Spin-A-Meal</h1> {/* Black title */}
        <p className="text-lg text-gray-600">Spin the wheel and discover new meal ideas!</p>

        {/* Input for adding new recipes */}
        <div className="flex flex-col items-center space-y-4 w-full max-w-md">
          <div className="flex space-x-2 w-full">
            <input
              type="text"
              value={inputRecipe}
              onChange={handleInputChange}
              className="px-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
              placeholder="Add a new recipe"
            />
            <button
              onClick={addRecipe}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Add Recipe
            </button>
          </div>
        </div>

        {/* Wheel Display */}
        <div className="mt-8 relative">
          <div
            className={`wheel w-72 h-72 rounded-full border-8 border-gradient-to-r from-blue-500 to-indigo-600 shadow-2xl flex items-center justify-center transition-all duration-1000 ${
              isSpinning ? "animate-spin" : ""
            }`}
            style={{
              transform: isSpinning ? "rotate(3600deg)" : "rotate(0deg)",
            }}
          >
            <div className="absolute w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Display recipes in a circular pattern around the wheel */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <div className="wheel-content absolute inset-0 flex items-center justify-center">
                      {recipes.map((recipe, index) => (
                        <div
                          key={index}
                          className="absolute text-center font-semibold"
                          style={{
                            transform: `rotate(${(360 / recipes.length) * index}deg) translateY(-140px)`,
                            top: "50%",
                            left: "50%",
                            transformOrigin: "0 100%",
                            color: "#333", // Dark color for text inside the wheel
                          }}
                        >
                          {recipe}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spinner result text */}
            {spinResult && !isSpinning && (
              <div className="absolute text-xl font-semibold top-1/2 transform -translate-y-1/2 text-black">
                {/* Plain black text for the chosen recipe */}
                <p>{spinResult}</p>
              </div>
            )}
          </div>

          {/* Arrow Indicator */}
          <div
            className="absolute top-0 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-transparent border-t-[#ff4500]"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          />
        </div>

        {/* Buttons for spinning and clearing */}
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
