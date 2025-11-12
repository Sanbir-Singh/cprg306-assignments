"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export async function fetchMealIdeas(ingredient) {
  if (!ingredient) return [];

  try {
    const encoded = encodeURIComponent(ingredient);
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encoded}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.error("MealDB fetch failed:", res.status);
      return [];
    }
    const data = await res.json();
    return data.meals || [];
  } catch (err) {
    console.error("Error fetching meal ideas:", err);
    return [];
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadMealIdeas = useCallback(async () => {
    if (!ingredient) {
      setMeals([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await fetchMealIdeas(ingredient);
      setMeals(result);
    } catch (err) {
      setError("Failed to load meal ideas.");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  }, [ingredient]); 

  useEffect(() => {
    loadMealIdeas();
  }, [loadMealIdeas]); 

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-slate-800 rounded-xl shadow-lg mb-8 text-white">
      <h2 className="text-2xl font-bold mb-4">Meal Ideas</h2>

      {!ingredient ? (
        <p className="text-sm">Click on an item in the list to see recipe ideas.</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : meals.length === 0 ? (
        <p className="text-sm">No meals found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
  {meals.map((m) => (
    <li key={m.idMeal} className="border rounded p-2">
      <p className="font-medium">{m.strMeal}</p>
      <img
        src={m.strMealThumb}   // URL externa
        alt={m.strMeal}
        className="mt-1 rounded"
      />
    </li>
  ))}
</ul>

      )}
    </div>
  );
}
