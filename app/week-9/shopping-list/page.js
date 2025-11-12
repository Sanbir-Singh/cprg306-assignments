"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";

import itemsData from "./items.json";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";

export default function ShoppingListPage() {
  const { user } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/week-9");
    }
  }, [user, router]);

  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-6">
        <p className="text-gray-600">Redirecting to login...</p>
      </main>
    );
  }

  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const makeId = () => Math.random().toString(36).slice(2, 10);

  function handleAddItem(newItem) {
    const withId = newItem.id ? newItem : { id: makeId(), ...newItem };
    setItems((prev) => [...prev, withId]);
  }

  function cleanName(name) {
    let base = name.split(",")[0];
    const emojiRegex =
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDFFF])+/g;
    base = base.replace(emojiRegex, "");
    return base.trim().toLowerCase();
  }

  function handleItemSelect(item) {
    const ingredient = cleanName(item.name);
    setSelectedItemName(ingredient);
  }

  return (
    <main className="p-4 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Shopping List + Meal Ideas</h1>

      <p className="mb-6 text-gray-700">
        Welcome, <strong>{user.displayName ?? "User"}</strong>!
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>

        <div>
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/week-9"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
