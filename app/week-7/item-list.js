"use client";
import Item from "./item";
import { useState } from "react";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");

  const itemsCopy = [...items];

  if (sortBy === "name") {
    itemsCopy.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "category") {
    itemsCopy.sort((a, b) => a.category.localeCompare(b.category));
  }

  return (
    <div>
      <div className="m-4 items-center justify-center flex">
        <label className="text-white mr-2 font-bold">Sort by:</label>
        <button
          className={`font-bold px-4 py-2 mr-2 rounded ${
            sortBy === "name" ? "bg-amber-300" : "bg-gray-500"
          } text-white`}
          onClick={() => setSortBy("name")}
        >
          Name
        </button>
        <button
          className={`font-bold px-4 py-2 rounded ${
            sortBy === "category" ? "bg-amber-300" : "bg-gray-500"
          } text-white`}
          onClick={() => setSortBy("category")}
        >
          Category
        </button>
      </div>

      <div>
        {itemsCopy.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
