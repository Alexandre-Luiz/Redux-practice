function ProductCard({ product, onDetailsClick }) {
  const { title, thumbnail, price, discountPercentage, rating, brand } = product;

  return (
    <div className="border rounded p-4 shadow-lg transform transition-transform duration-300 hover:scale-105">
      <div className="flex justify-center">
        <img src={thumbnail} alt={title} className="h-64 object-cover mb-4 " />
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p>Marca: {brand}</p>
      <p>Preço: ${price.toFixed(2)}</p>
      <p>Desconto: {discountPercentage}%</p>
      <p>Nota: {rating} ★</p>
      <div className="flex justify-end items-end">
        <button
          className="hover:shadow-lg text-white font-bold bg-blue-600 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => onDetailsClick(product.id)}
        >
          Detalhes
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
