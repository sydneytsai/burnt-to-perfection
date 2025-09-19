"use client"; // Enable client-side hooks in Next.js

import React, { useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar"; // Import the Navbar component

const RecipeGenerator = () => {
  // State to store answers to each question
  const [answers, setAnswers] = useState({
    cuisine: "",
    mealType: "",
    dietaryRestrictions: "",
    cookingTime: "",
    ingredientPreference: "",
  });

  // State to track the current question
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [generatedRecipe, setGeneratedRecipe] = useState("");
  const [loading, setLoading] = useState(false);

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
      field: "ingredientPreference",
    },
  ];

  // Function to handle the user's answer selection
  const handleAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].field]: answer,
    });
    setCurrentQuestion(currentQuestion + 1);
  };

  // Function to generate recipe suggestion using OpenAI API
  const generateRecipeWithOpenAI = async () => {
    setLoading(true);

    const prompt = `I want to generate a recipe for the following inputs: 
      Cuisine: ${answers.cuisine}
      Meal Type: ${answers.mealType}
      Dietary Restrictions: ${answers.dietaryRestrictions}
      Cooking Time: ${answers.cookingTime}
      Main Ingredient: ${answers.ingredientPreference}
      
      Based on these inputs, suggest a recipe.`;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003", // Choose the model you want
          prompt: prompt,
          max_tokens: 150, // You can adjust this based on how detailed you want the response
          temperature: 0.7, // Adjust this for more randomness or more focused answers
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API key
          },
        }
      );

      // Save the response to display as the generated recipe
      setGeneratedRecipe(response.data.choices[0].text);
    } catch (error) {
      console.error("Error generating recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  // If we've reached the last question, show the generated recipe
  if (currentQuestion === questions.length) {
    // Trigger OpenAI recipe generation when all answers are submitted
    if (!generatedRecipe && !loading) {
      generateRecipeWithOpenAI();
    }

    return (
      <main className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar Component */}
        <Navbar />

        <section className="flex-grow flex items-center justify-center px-4 py-8">
          <div className="text-center p-6 bg-white shadow-md rounded-lg w-full max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Recipe Generated!</h2>
            {loading ? (
              <p className="text-lg text-gray-500">Generating recipe...</p>
            ) : (
              <p className="text-lg">{generatedRecipe}</p>
            )}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar Component */}
      <Navbar />

      <section className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="text-center w-full max-w-3xl">
          {/* Header */}
          <h1 className="text-4xl font-bold mb-6">AI Recipe Generator</h1>
          <h2 className="text-2xl mb-6">{questions[currentQuestion].question}</h2>
          
          {/* Question Options */}
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="px-6 py-3 text-blue-500 font-semibold rounded-lg w-full hover:bg-blue-100 transition duration-200"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecipeGenerator;
