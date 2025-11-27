import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, doc, deleteDoc } from "firebase/firestore";

export async function getItems(userId) {
  // If no user is logged in, returns empty
  if (!userId) return [];

  // Path: users/{userId}/items
  const itemsRef = collection(db, "users", userId, "items");
  const q = query(itemsRef);

  // Search documents in Firestore
  const querySnapshot = await getDocs(q);

  const items = [];
  
  querySnapshot.forEach((doc) => {
    items.push({
      id: doc.id,   // doc ID
      ...doc.data() // doc data (name, quantity, etc)
    });
  });

  return items;
}

export async function addItem(userId, item) {
  if (!userId) return null;

  // Subcollection reference
  const itemsRef = collection(db, "users", userId, "items");

  // Create the document in Firestore
  const docRef = await addDoc(itemsRef, item);

  // Returns the ID of the new document
  return docRef.id;
}

export async function deleteItem(userId, itemId) {
  if (!userId || !itemId) {
    console.warn("deleteItem called with invalid userId or itemId:", userId, itemId);
    return;
  }
  const uid = String(userId);
  const docId = String(itemId);

  try {
    console.log("Deleting item with IDs:", uid, docId);

    const itemDocRef = doc(db, "users", uid, "items", docId);

    await deleteDoc(itemDocRef);
    console.log(`Document with ID ${docId} successfully deleted.`);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error; 
  }
}