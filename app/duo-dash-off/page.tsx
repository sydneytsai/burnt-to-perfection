"use client"; // Enable client-side hooks in Next.js

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios"; // for API calls

export default function DuoDashOff() {
  // States
  const [dishType, setDishType] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [numIngredients, setNumIngredients] = useState<number>(5); // Default to 5 ingredients
  const [timer, setTimer] = useState<number>(0);
  const [isCooking, setIsCooking] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Dish options
  const dishOptions = ["Main Dish", "Dessert", "Side"];

  // Handle dish type selection
  const handleDishTypeSelection = (selectedDishType: string) => {
    setDishType(selectedDishType);
    setTimeLeft(getDishTime(selectedDishType)); // Set initial timer based on dish type
  };

  // Set timer based on dish type
  const getDishTime = (type: string) => {
    switch (type) {
      case "Dessert":
        return 60 * 60; // 60 minutes
      case "Main Dish":
        return 90 * 60; // 90 minutes
      case "Side":
        return 30 * 60; // 30 minutes
      default:
        return 0;
    }
  };

  // Handle number of ingredients input change
  const handleNumIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumIngredients(Number(e.target.value));
  };

  // Generate AI ingredients
  const generateIngredients = async () => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions", 
        {
          model: "text-davinci-003",
          prompt: `Generate a list of ${numIngredients} random ingredients for a cooking competition.`,
          max_tokens: 100,
          temperature: 0.7,
        },
        {
          headers: {
            "Authorization": `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API Key
          },
        }
      );

      const ingredientsList = response.data.choices[0].text.trim().split("\n").map((ingredient: string) => ingredient.trim());
      setIngredients(ingredientsList);
    } catch (error) {
      console.error("Error generating ingredients:", error);
      setIngredients([]);
    }
  };

  // Start timer for cooking
  const startTimer = () => {
    setIsCooking(true);
    setTimer(timeLeft); // Initialize timer with selected time
  };

  // Stop the timer
  const stopTimer = () => {
    setIsCooking(false); // Stop the cooking timer but keep the current time
  };

  // Reset timer
  const resetTimer = () => {
    setIsCooking(false);
    setTimeLeft(getDishTime(dishType || "Dessert"));
  };

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCooking && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      setIsCooking(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isCooking, timeLeft]);

  // Format the time
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-white"> {/* White background */}
      <Navbar />
      <section className="flex-grow flex flex-col items-center justify-center text-center space-y-8 px-6 py-12">
        <h1 className="text-4xl font-bold text-black">Duo Dash-Off</h1> {/* Black title */}
        <p className="text-lg text-gray-600">Compete in a cooking challenge with your friend!</p>

        {/* Dish Type and Ingredients Input */}
        {!dishType ? (
          <div className="space-y-4">
            <h2 className="text-xl">What type of dish would you like to make?</h2>
            {dishOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleDishTypeSelection(option)}
                className="px-6 py-3 text-black-500 font-semibold rounded-lg w-full hover:bg-gray-100 transition duration-200"
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <>
            {/* Ingredient number selection */}
            <div className="mb-6">
              <h3 className="text-lg">How many ingredients would you like to use?</h3>
              <input
                type="number"
                value={numIngredients}
                onChange={handleNumIngredientsChange}
                min="1"
                max="10"
                className="mt-2 px-4 py-2 border border-gray-300 rounded-lg w-20 text-center"
              />
              <button
                onClick={generateIngredients}
                className="ml-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
              >
                Generate Ingredients
              </button>
            </div>

            {/* Display generated ingredients */}
            <div className="text-center mb-6">
              <h2 className="text-lg">Generated Ingredients:</h2>
              <ul className="list-disc list-inside">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            {/* Timer display */}
            <div className="text-3xl font-bold mb-6">
              {isCooking ? (
                <p>Time Left: {formatTime(timeLeft)}</p>
              ) : (
                <p>Timer: {formatTime(timeLeft)}</p>
              )}
            </div>

            {/* Start Cooking Button */}
            {!isCooking && (
              <button
                onClick={startTimer}
                className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
              >
                Start Cooking
              </button>
            )}

            {/* Timer control buttons */}
            {isCooking && (
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={stopTimer}
                  className="px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
                >
                  Stop Timer
                </button>

                <button
                  onClick={resetTimer}
                  className="px-8 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                >
                  Reset Timer
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
