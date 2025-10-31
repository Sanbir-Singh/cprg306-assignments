export default function Item({ item, onSelect }) {
  const { name, quantity, category } = item;

  return (
    <div className="flex justify-center">
      <section 
        role="button"
        tabIndex={0}
        onClick={() => onSelect && onSelect(item)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onSelect && onSelect(item);
          }
        }}
        className="bg-slate-800 text-center w-xl p-2 m-2 rounded-lg cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
      >
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