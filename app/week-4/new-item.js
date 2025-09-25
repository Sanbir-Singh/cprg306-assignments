"use client";
import { useState } from "react";

export default function NewItem() {
  let [quantity, setQuantity] = useState(1);

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

  return (
    <div className="flex justify-center">
      <div className="flex flex-row items-center justify-center bg-slate-800 p-2 gap-4 rounded-lg">
        <div className=" flex bg-cyan-700 hover:bg-slate-500 p-3 rounded text-white font-bold">
          Value: {quantity}
        </div>
        <button
          onClick={decrement}
          className={`text-white w-8 p-2 m-auto font-bold rounded ${
            quantity <= 1
              ? "bg-slate-700 cursor-not-allowed hover:bg-slate-700"
              : "bg-blue-400 hover:bg-cyan-700 active:bg-slate-400"
          }`}
          disabled={quantity <= 1}
        >
          -
        </button>
        <button
          onClick={increment}
          className={`text-white w-8 p-2 m-auto font-bold rounded ${
            quantity >= 20
              ? "bg-slate-700 cursor-not-allowed hover:bg-slate-700"
              : "bg-blue-400 hover:bg-cyan-700 active:bg-slate-400"
          }`}
          disabled={quantity >= 20}
        >
          +
        </button>
      </div>
    </div>
  );
}
