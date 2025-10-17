"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (item) => {
    const newItem = {
      ...item,
      id: Math.floor(Math.random() * 10000),
    };
    setItems([...items, newItem]);
  };

  return (
    <main className="bg-black min-h-screen p-4">
      <h1 className="text-4xl font-bold text-white text-center p-2 mb-6">
        Shopping List
      </h1>
      <div className="max-w-4xl mx-auto">
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} />
      </div>
    </main>
  );
}
