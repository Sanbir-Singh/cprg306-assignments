"use client";
import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("produce");
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const item = {
      name,
      quantity,
      category,
      // id generated in page.js
    };

    onAddItem(item);

    // Reset form
    setName("");
    setCategory("produce");
    setQuantity(1);
  };

  return (
    <section className="max-w-md mx-auto mt-6 p-6 bg-slate-800 rounded-xl shadow-lg mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-white font-bold mb-2">Item Name:</label>
          <input
            className="w-full text-white bg-slate-700 p-2 rounded outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
            required
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="text-white font-bold">Quantity:</label>
            <div className="flex items-center gap-4">
              <span className="text-white font-bold w-8 text-center">
                {quantity}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={decrement}
                  className={`w-10 h-10 text-lg font-bold rounded ${
                    quantity <= 1
                      ? "bg-slate-700 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
                  }`}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={increment}
                  className={`w-10 h-10 text-lg font-bold rounded ${
                    quantity >= 20
                      ? "bg-slate-700 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700"
                  }`}
                  disabled={quantity >= 20}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-white font-bold mb-2">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 rounded bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="produce">Produce</option>
              <option value="dairy">Dairy</option>
              <option value="bakery">Bakery</option>
              <option value="meat">Meat</option>
              <option value="frozen">Frozen Foods</option>
              <option value="canned">Canned Goods</option>
              <option value="dry">Dry Goods</option>
              <option value="beverages">Beverages</option>
              <option value="snacks">Snacks</option>
              <option value="household">Household</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={!name}
          className={`w-full py-2 rounded font-bold ${
            !name
              ? "bg-slate-500 text-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 active:bg-green-600"
          }`}
        >
          Add Item
        </button>
      </form>
    </section>
  );
}