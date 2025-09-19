"use client"; // This is important to enable client-side hooks in Next.js

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";

export default function CleanoutMyFridge() {
  const [ingredients, setIngredients] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredients(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    // Example prompt, modify as needed
    const prompt = `Generate a recipe based on these ingredients: ${ingredients}`;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions", // Replace with the actual API endpoint for recipe generation
        {
          model: "text-davinci-003", // Choose the model you want
          prompt: prompt,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API key
          },
        }
      );
      
      setGeneratedRecipe(response.data.choices[0].text);
    } catch (error) {
      console.error("Error generating recipe:", error);
    } finally {
      setLoading(false);
      setSubmitted(true); // Mark as submitted so we can display the recipe
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow flex flex-col items-center justify-center space-y-6 px-4">
        {/* Stacked Items */}
        <h1 className="text-4xl font-bold">Cleanout My Fridge</h1>
        <p className="text-lg">Let's see what we can make with the ingredients in your fridge!</p>

        {/* Questionnaire Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg mx-auto">
            <div>
              <label className="block text-lg mb-2">What ingredients do you have in your fridge?</label>
              <input
                type="text"
                value={ingredients}
                onChange={handleInputChange}
                className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-lg"
                placeholder="e.g., chicken, broccoli, cheese"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg w-full hover:bg-blue-400"
              disabled={loading}
            >
              {loading ? "Generating Recipe..." : "Generate Recipe"}
            </button>
          </form>
        ) : (
          <div className="space-y-4 w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-bold">Recipe Based on Your Ingredients</h2>
            {loading ? (
              <p>Generating recipe...</p>
            ) : (
              <p>{generatedRecipe || "No recipe found. Try adding more ingredients!"}</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
