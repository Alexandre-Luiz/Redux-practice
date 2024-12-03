function Filters({
  onSortByName,
  onSortByPrice,
  onFilterByRating,
  categories,
  onFilterByCategory,
}) {
  return (
    <div className="flex gap-4 mb-4">
      <div className="flex gap-2">
        <button onClick={() => onSortByName('asc')} className="bg-gray-200 px-2 py-2 rounded">
          Nome (A-Z)
        </button>
        <button onClick={() => onSortByName('desc')} className="bg-gray-200 px-4 py-2 rounded">
          Nome (Z-A)
        </button>
      </div>

      {/* Sort by Price */}
      <div className="flex gap-2">
        <button onClick={() => onSortByPrice('asc')} className="bg-gray-200 px-4 py-2 rounded">
          Ordenar menor preço
        </button>
        <button onClick={() => onSortByPrice('desc')} className="bg-gray-200 px-4 py-2 rounded">
          Ordenar maior preço
        </button>
      </div>

      <select
        onChange={(e) => onFilterByRating(e.target.value)}
        className="border rounded px-4 py-2"
      >
        <option value="">Selecione uma nota</option>
        <option value="4">Maior do que 4</option>
        <option value="3">Maior do que 3</option>
        <option value="2">Maior do que 2</option>
      </select>
      <select
        onChange={(e) => onFilterByCategory(e.target.value)}
        className="border rounded px-4 py-2"
      >
        <option value="">Selecione uma Categoria</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
