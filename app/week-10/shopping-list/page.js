"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; 

// Component Imports
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";

// Service Imports
import { getItems, addItem, deleteItem } from "../_services/shopping-list-service";
import { useUserAuth } from "../_utils/auth-context";

export default function ShoppingListPage() {
  // --- Authentication and State ---
  const { user } = useUserAuth();
  const [items, setItems] = useState([]); 
  const [selectedItemName, setSelectedItemName] = useState("");

  // 1. Get the shopping list: Create an async function loadItems.
  const loadItems = async () => {
    if (user) {
      try {
        // Call getItems function to get the shopping list items for the current user
        const fetchedItems = await getItems(user.uid);
        // Use setItems to set the state of items
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error loading items:", error);
      }
    }
  };

  
  useEffect(() => {
    loadItems();
  }, [user]);

  async function handleAddItem(newItem) {
    if (!user) {
      console.log("User not logged in. Cannot add item.");
      return;
    }

    try {
      // Call the addItem function to add the item to the shopping list.
      // Use user.uid as the userId parameter.
      const itemId = await addItem(user.uid, newItem);

      // Use the id returned from addItem to set the id of the new item.
      const newItemWithId = {
        ...newItem,
        id: itemId,
      };

      // Use setItems to set the state of items to include the new item.
      setItems((prevItems) => [...prevItems, newItemWithId]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  }

  async function handleDeleteItem(itemId) {
        if (!user) {
            console.log("User not logged in. Cannot delete item..");
            return;
        }

        try {
            // Call the service function to delete in Firestore
            await deleteItem(user.uid, itemId);

            // Updates the local state by removing the item
            setItems((prevItems) => prevItems.filter(item => item.id !== itemId));

            console.log("Item successfully deleted and status updatedo.");
        } catch (error) {
            console.error( "Error deleting item:", error);
            }
          }

  // --- Helper Functions ---
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

  // --- Rendering ---
  // Display a loading state or a prompt to log in
  if (!user) {
    return (
      <main className="p-4 max-w-5xl mx-auto min-h-screen text-center">
        <p className="text-xl mt-12 mb-4">
          You must be logged in to view the shopping list.
        </p>
        <Link
          href="/week-10"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Go to Login Page
        </Link>
      </main>
    );
  }

  return (
    <main className="p-4 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Shopping List + Meal Ideas</h1>

      <p className="mb-6 text-gray-700">
        Welcome,{" "}
        <strong>{user.displayName ? user.displayName : user.email}</strong>!
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <NewItem onAddItem={handleAddItem} />
          <ItemList 
          items={items} 
          onItemSelect={handleItemSelect} 
          onDeleteItem={handleDeleteItem}/>
        </div>

        <div>
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/week-10"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}