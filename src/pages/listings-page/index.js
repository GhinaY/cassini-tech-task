import { useCallback, useEffect, useState } from 'react';
import ProductCard from '../../components/product-card';
import DropdownFilter from '../../components/dropdown-filter';
import './styles.css';

const BASE_URL = 'https://fakestoreapi.com/products';

function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState();
  const [limitPreference, setLimitPreference] = useState(10);

  const fetchProducts = useCallback(async (category, limit) => {
    const url = BASE_URL +
      (category ? `/category/${category}` : '') +
      (`?limit=${limit}`);

    const res = await fetch(url);
    if (res.ok !== true) {
      throw new Response("Error fetching listings", { status: res.status });
    };

    const data = await res.json();
    setListings(data);
  }, [])

  const fetchCategories = useCallback(async () => {
    const url = BASE_URL + '/categories';
    const res = await fetch(url);
    if (res.ok !== true) {
      throw new Response("Error fetching categories", { status: res.status });
    };

    const data = await res.json();
    setCategoryOptions(data);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => { 
    fetchProducts(categoryFilter, limitPreference) 
  }, [categoryFilter, fetchProducts, limitPreference]);
  
  return (
    <div className='ListingsPageContainer'>
      <header className='Header'>
        <h1 className='ListingsTitle'>{categoryFilter || 'All Products'}</h1>
        <div className='FiltersBar'>
          <DropdownFilter 
            filterName='Category' 
            options={categoryOptions} 
            currentSelection={categoryFilter} 
            setCurrentSelection={setCategoryFilter}
          />
        </div>
      </header>
      <div className='ListingsGrid'>
        {listings.map((product) => <ProductCard key={product.id} {...product}/>)}
      </div>
    </div>
  );
}

export default ListingsPage;
