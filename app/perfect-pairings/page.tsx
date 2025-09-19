"use client"; // Enable client-side hooks in Next.js

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";

export default function PerfectPairings() {
  // State to store answers for both players
  const [answersPlayer1, setAnswersPlayer1] = useState({
    cuisine: "",
    mealType: "",
    dietaryRestrictions: "",
    cookingTime: "",
    mainIngredient: "",
  });

  const [answersPlayer2, setAnswersPlayer2] = useState({
    cuisine: "",
    mealType: "",
    dietaryRestrictions: "",
    cookingTime: "",
    mainIngredient: "",
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState(1); // Track which player is answering

  // Questions array
  const questions = [
    {
      question: "What type of cuisine would you like?",
      options: ["Italian", "Indian", "Chinese", "Mexican", "American"],
      field: "cuisine",
    },
    {
      question: "What type of meal are you looking for?",
      options: ["Breakfast", "Lunch", "Dinner", "Snack"],
      field: "mealType",
    },
    {
      question: "Do you have any dietary restrictions?",
      options: ["Vegetarian", "Vegan", "Gluten-Free", "None"],
      field: "dietaryRestrictions",
    },
    {
      question: "How much time do you have to cook?",
      options: ["Less than 30 minutes", "30-60 minutes", "More than 60 minutes"],
      field: "cookingTime",
    },
    {
      question: "What is your preferred main ingredient?",
      options: ["Chicken", "Beef", "Tofu", "Vegetables", "Fish"],
      field: "mainIngredient",
    },
  ];

  // Function to handle the answer input
  const handleAnswer = (answer: string) => {
    if (player === 1) {
      setAnswersPlayer1({ ...answersPlayer1, [questions[currentQuestion].field]: answer });
    } else {
      setAnswersPlayer2({ ...answersPlayer2, [questions[currentQuestion].field]: answer });
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (player === 1) {
        setPlayer(2); // Switch to player 2
        setCurrentQuestion(0); // Reset to first question
      } else {
        generateRecipe(); // Generate recipe after both players finish
      }
    }
  };

  // Function to generate the recipe using an API (e.g., OpenAI)
  const generateRecipe = async () => {
    setLoading(true);

    const prompt = `Generate a recipe based on the following inputs:
      Player 1 - Cuisine: ${answersPlayer1.cuisine}, Meal Type: ${answersPlayer1.mealType}, Dietary Restrictions: ${answersPlayer1.dietaryRestrictions}, Cooking Time: ${answersPlayer1.cookingTime}, Main Ingredient: ${answersPlayer1.mainIngredient}.
      Player 2 - Cuisine: ${answersPlayer2.cuisine}, Meal Type: ${answersPlayer2.mealType}, Dietary Restrictions: ${answersPlayer2.dietaryRestrictions}, Cooking Time: ${answersPlayer2.cookingTime}, Main Ingredient: ${answersPlayer2.mainIngredient}.
      
      Provide a recipe that combines their preferences and suggests steps for both players to cook together.`;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions", // Adjust this for your API
        {
          model: "text-davinci-003", // Or other model
          prompt: prompt,
          max_tokens: 300,
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
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-white"> {/* White background */}
      <Navbar />
      <section className="flex-grow flex flex-col items-center justify-center text-center space-y-8 px-6 py-12">
        <h1 className="text-4xl font-bold text-black">Perfect Pairings</h1> {/* Black title */}
        <p className="text-lg text-gray-600">Work together to create the perfect meal!</p>

        {/* Display questions based on which player is answering */}
        <div className="w-full max-w-md">
          {generatedRecipe ? (
            // Display the generated recipe
            <div className="bg-white p-6 rounded-lg shadow-md text-gray-800">
              <h2 className="text-2xl font-semibold">Recipe for Both Players:</h2>
              <p>{generatedRecipe}</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl mb-4">{`Player ${player} - ${questions[currentQuestion].question}`}</h2>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg w-full hover:bg-blue-400"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Loading indicator */}
        {loading && <p>Generating recipe...</p>}
      </section>
    </main>
  );
}
