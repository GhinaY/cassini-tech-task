import { useCallback, useEffect, useState } from 'react';
import ProductCard from '../../components/product-card';
import './styles.css';

const BASE_URL = 'https://fakestoreapi.com/products';

function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [limitPreference, setLimitPreference] = useState(10);

  const fetchProducts = useCallback(async (category, limit) => {
    const url = BASE_URL +
      (category ? `/category/${category}` : '') +
      (`?limit=${limit}`);

    const res = await fetch(url);
    if (res.status === 404) {
      throw new Response("Error fetching listings", { status: res.status });
    };

    const data = await res.json();
    setListings(data);
  }, [])

  useEffect(() => { 
    fetchProducts(categoryFilter, limitPreference) 
  }, [categoryFilter, fetchProducts, limitPreference]);
  
  return (
    <div className='ListingsPageContainer'>
      <h1>{categoryFilter ?? 'All'} Products</h1>
      <div className='ListingsGrid'>
        {listings.map((product) => <ProductCard {...product}/>)}
      </div>
    </div>
  );
}

export default ListingsPage;
