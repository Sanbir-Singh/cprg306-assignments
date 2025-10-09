export default function Item({ item }) {
  const { name, quantity, category } = item;

  return (
    <div className="flex justify-center">
      <section className="bg-slate-800 text-center w-xl p-2 m-2 rounded-lg">
        <ul>
          <li className="text-2xl font-bold text-white">{name}</li>
          <li className="text-lg text-white">
            Buy {quantity} in {category}
          </li>
        </ul>
      </section>
    </div>
  );
}
