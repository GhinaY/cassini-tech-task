import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useListingsContext } from '../../utils/listings-context';
import { API_BASE_URL } from '../../utils';
import ProductForm from '../../components/product-form';
import ProductDetailsView from './product-details-view';
import './styles.css';

function ProductPage({ createMode = false }) {
  const navigate = useNavigate();
  const { id: providedId } = useParams();
  const { listings, updateSingleListing } = useListingsContext();
  const [listingId, setListingId] = useState(providedId);
  const [isLoading, setIsLoading] = useState(!createMode && !listings[providedId]);
  const [isEditing, setIsEditing] = useState(createMode);

  const fetchListing = useCallback(async () => {
    if (listingId) {
      setIsLoading(true);
      try {
        const res = await fetch(API_BASE_URL + '/' + listingId);
        if (!res.ok) {
          throw new Error("Error fetching listing data");
        };

        const data = await res.json();
        updateSingleListing(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        return;
      }
    }
  }, [listingId, updateSingleListing]);

  const onFormSubmit = useCallback((newProductDetails) => {
    setIsEditing(false);
    updateSingleListing(newProductDetails);
    
    if (createMode) {
      setListingId(newProductDetails.id);
      navigate(`../product/${newProductDetails.id}`, { replace: true });
    };
  }, [createMode, navigate, updateSingleListing])

  useEffect(() => {
    if (listingId && !isEditing && !listings[listingId]) {
      fetchListing()
    }
  }, [fetchListing, listingId, isEditing, listings])

  return useMemo(() => (
    <div className='ProductPageContainer'>
      {isLoading ? 
        (<span>Loading...</span>) : 
        isEditing ? 
          <ProductForm createMode={createMode} listingDetails={listings[listingId]} onSubmit={onFormSubmit}/> : 
          <ProductDetailsView listingDetails={listings[listingId]} setIsEditing={setIsEditing} />}
    </div>
  ), [isLoading, isEditing, createMode, listings, listingId, onFormSubmit]);
}

export default ProductPage;
