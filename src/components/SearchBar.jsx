function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Buscar produto"
      className="border rounded w-full p-2 mb-4"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBar;
