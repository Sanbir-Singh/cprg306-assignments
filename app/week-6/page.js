import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="bg-black">
      <h1 className="text-4xl font-bold text-white text-center p-2">
        Shopping List
      </h1>
      <ItemList />
    </main>
  );
}
