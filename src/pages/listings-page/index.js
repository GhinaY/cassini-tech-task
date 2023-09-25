import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListingsContext } from '../../utils/listings-context';
import { getStorageItem, updateStorageItem } from '../../utils/session-storage';
import { API_BASE_URL } from '../../utils';
import CategoryFilter from '../../components/category-filter';
import ProductCard from '../../components/product-card';
import Button from '../../components/ui/button';
import './styles.css';

const LISTINGS_NUMBER_INTERVAL = 10;
const CATEGORY_FILTER_STORAGE_KEY = 'selectedCategoryFilter';
const NUMBER_TO_FETCH_STORAGE_KEY = 'numberOfProductsToFetch';

function ListingsPage() {
  const navigate = useNavigate();
  const { listings, setListingsFromArray } = useListingsContext();
  const [categoryFilter, setCategoryFilter] = useState(getStorageItem(CATEGORY_FILTER_STORAGE_KEY) || '');
  const [numberToFetch, setNumberToFetch] = useState(parseInt(getStorageItem(NUMBER_TO_FETCH_STORAGE_KEY)) || LISTINGS_NUMBER_INTERVAL);
  const [allResultsShown, setAllResultsShown] = useState(false);

  const fetchProducts = useCallback(async (category, limit) => {
    const url = API_BASE_URL +
      (category ? `/category/${category}` : '') +
      (`?limit=${limit}`);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Error fetching listings");
      };

      const data = await res.json();

      if (data.length < limit) {
        setAllResultsShown(true);
      } else {
        setAllResultsShown(false);
      }

      setListingsFromArray(data);
    } catch (error) {
      console.log(error);
    }
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
        <div className='ControlsBar'>
          <CategoryFilter 
            value={categoryFilter}
            setCurrentSelection={setCategoryFilter}
            shouldShowOptionForAll
          />
          <Button onClick={() => navigate('/create')} content='Create' />
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
