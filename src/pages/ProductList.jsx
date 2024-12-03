import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllProducts,
  fetchProductDetails,
  filterBySearch,
  sortByName,
  sortByPrice,
  filterByRating,
  filterByCategory,
} from '../redux/productsSlice';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import ProductDetailsModal from '../components/ProductDetailsModal';

function ProductList() {
  const dispatch = useDispatch();
  const { filteredProducts, loading, error, categories } = useSelector((state) => state.products);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  function handleDetailsClick(productId) {
    dispatch(fetchProductDetails(productId));
    setModalOpen(true);
  }

  // if (loading) return <div>Loading...</div>;
  // Not the best solution, maybe create another loading
  if (loading && !modalOpen) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={(query) => dispatch(filterBySearch(query))} />
      <Filters
        // onSortByName={() => dispatch(sortByName())}
        // onSortByPrice={() => dispatch(sortByPrice())}
        onSortByName={(direction) => dispatch(sortByName(direction))}
        onSortByPrice={(direction) => dispatch(sortByPrice(direction))}
        onFilterByRating={(rating) => dispatch(filterByRating(rating))}
        categories={categories}
        onFilterByCategory={(category) => dispatch(filterByCategory(category))}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onDetailsClick={handleDetailsClick} />
        ))}
      </div>
      <ProductDetailsModal open={modalOpen} handleClose={() => setModalOpen(false)} />
    </div>
  );
}

export default ProductList;
