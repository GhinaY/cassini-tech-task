import { useCallback, useEffect, useState } from 'react';
import CategoryFilter from '../../components/category-filter';
import ProductCard from '../../components/product-card';
import Button from '../../components/ui/button';
import { useListingsContext } from '../../utils/listings-context';
import { getStorageItem, updateStorageItem } from '../../utils/session-storage';
import { API_BASE_URL } from '../../utils';
import './styles.css';

const LISTINGS_NUMBER_INTERVAL = 10;
const CATEGORY_FILTER_STORAGE_KEY = 'selectedCategoryFilter';
const NUMBER_TO_FETCH_STORAGE_KEY = 'numberOfProductsToFetch';

function ListingsPage() {
  const { listings, setListingsFromArray } = useListingsContext();
  const [categoryFilter, setCategoryFilter] = useState(getStorageItem(CATEGORY_FILTER_STORAGE_KEY) || '');
  const [numberToFetch, setNumberToFetch] = useState(parseInt(getStorageItem(NUMBER_TO_FETCH_STORAGE_KEY)) || LISTINGS_NUMBER_INTERVAL);
  const [allResultsShown, setAllResultsShown] = useState(false);

  const fetchProducts = useCallback(async (category, limit) => {
    const url = API_BASE_URL +
      (category ? `/category/${category}` : '') +
      (`?limit=${limit}`);

    const res = await fetch(url);
    if (res.ok !== true) {
      throw new Response("Error fetching listings", { status: res.status });
    };

    const data = await res.json();

    if (data.length < limit) {
      setAllResultsShown(true);
    } else {
      setAllResultsShown(false);
    }

    setListingsFromArray(data);
  }, [setListingsFromArray])

  useEffect(() => { 
    fetchProducts(categoryFilter, numberToFetch);
    updateStorageItem(CATEGORY_FILTER_STORAGE_KEY, categoryFilter);
    updateStorageItem(NUMBER_TO_FETCH_STORAGE_KEY, numberToFetch)
  }, [categoryFilter, fetchProducts, numberToFetch]);
  
  return (
    <div className='ListingsPageContainer'>
      <header className='Header'>
        <h1 className='ListingsTitle'>{categoryFilter || 'All Products'}</h1>
        <div className='FiltersBar'>
          <CategoryFilter 
            value={categoryFilter}
            setCurrentSelection={setCategoryFilter}
            shouldShowOptionForAll
          />
        </div>
      </header>
      <div className='ListingsGrid'>
        {Object.values(listings).map((product) => <ProductCard key={product.id} {...product}/>)}
      </div>
      {!allResultsShown && <Button content='Load more' onClick={() => setNumberToFetch(numberToFetch + LISTINGS_NUMBER_INTERVAL)} />}
    </div>
  );
}

export default ListingsPage;
