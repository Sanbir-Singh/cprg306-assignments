"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (item) => {
    const newItem = {
      ...item,
      id: Math.floor(Math.random() * 10000),
    };
    setItems([...items, newItem]);
  };

const cleanName = (raw) => {
    if (!raw) return "";

    let name = raw.split(",")[0].trim();

    name = name.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF][\uDC00-\uDFFF]|[\uFE0F]|[\uD83D][\uDC00-\uDFFF])/g,
      ""
    );

    name = name.replace(/\b\d+(\.\d+)?\s?(kg|g|ml|l|L|oz|pack|dozen|kg\.)?\b/gi, "");

    name = name.replace(/\s{2,}/g, " ").trim();

    return name.toLowerCase();
  };

  const handleItemSelect = (item) => {
    const rawName = item?.name ?? "";
    const cleaned = cleanName(rawName);
    setSelectedItemName(cleaned);
  };

return (
  <main className="bg-black min-h-screen p-4">
    <h1 className="text-4xl font-bold text-white text-center p-2 mb-6">
      Shopping List
    </h1>

    <div className="flex flex-col md:flex-row max-w-6xl mx-auto gap-6">

      <div className="w-full md:w-1/2">
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} onItemSelect={handleItemSelect} />
      </div>

      <div className="hidden md:block border-l border-slate-700 mx-2" />

      <div className="w-full md:w-1/2 md:pl-6">
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </div>
  </main>
);;
}