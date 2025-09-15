"use client";  // Marking this as a client-side component

import Navbar from "@/components/Navbar";
import { useState } from "react";
import Link from "next/link";

export default function InteractiveCookingLab() {
  const [isCookingForTwoOpen, setIsCookingForTwoOpen] = useState(false);
  const [isKitchenGameshowOpen, setIsKitchenGameshowOpen] = useState(false);

  // Function to toggle Cooking for Two options
  const toggleCookingForTwo = () => {
    setIsCookingForTwoOpen(!isCookingForTwoOpen);
    // Close Kitchen Gameshow options when Cooking for Two is toggled
    if (isKitchenGameshowOpen) setIsKitchenGameshowOpen(false);
  };

  // Function to toggle Kitchen Gameshow options
  const toggleKitchenGameshow = () => {
    setIsKitchenGameshowOpen(!isKitchenGameshowOpen);
    // Close Cooking for Two options when Kitchen Gameshow is toggled
    if (isCookingForTwoOpen) setIsCookingForTwoOpen(false);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-4xl font-bold">Interactive Cooking Lab</h1>

        {/* Main options */}
        <div className="flex space-x-8">
          <button
            onClick={toggleCookingForTwo}
            className="text-lg hover:underline"
          >
            Cooking for Two
          </button>
          <button
            onClick={toggleKitchenGameshow}
            className="text-lg hover:underline"
          >
            Kitchen Gameshow
          </button>

          {/* Direct Link to Recipe Questionnaire page */}
          <Link
            href="/recipe-questionnaire"
            className="text-lg hover:underline"
          >
            Recipe Questionnaire
          </Link>
        </div>

        {/* Cooking for Two options */}
        {isCookingForTwoOpen && (
          <div className="mt-4">
            <Link href="/duo-dash-off" className="block py-2 px-4 hover:bg-gray-100">
              Duo Dash-Off
            </Link>
            <Link href="/perfect-pairings" className="block py-2 px-4 hover:bg-gray-100">
              Perfect Pairings
            </Link>
          </div>
        )}

        {/* Kitchen Gameshow options */}
        {isKitchenGameshowOpen && (
          <div className="mt-4">
            <Link href="/spin-a-meal" className="block py-2 px-4 hover:bg-gray-100">
              Spin-A-Meal
            </Link>
            <Link href="/cleanout-my-fridge" className="block py-2 px-4 hover:bg-gray-100">
              Cleanout My Fridge
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
