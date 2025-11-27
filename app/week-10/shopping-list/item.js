export default function Item({ item, onSelect, onDelete }) {
  const { name, quantity, category } = item;

  const handleDeleteClick = (e) => {
        e.stopPropagation(); 
        if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
             onDelete(item.id);
        }
    };
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
        className="bg-slate-800 text-white w-xl p-2 m-2 rounded-lg cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 flex justify-between items-center"
      >
        {/* Item Details */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold capitalize">{name}</h3>
          <p className="text-sm">
            Buy {quantity} in {category}
          </p>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDeleteClick}
          className="ml-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-150 ease-in-out text-lg font-bold w-8 h-8 flex items-center justify-center"
          aria-label={`Delete ${name}`}
        >
          &times;
        </button>

      </section>
    </div>
  );
}