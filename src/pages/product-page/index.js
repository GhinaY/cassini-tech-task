import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useListingsContext } from '../../utils/listings-context';
import { API_BASE_URL } from '../../utils';
import './styles.css';

function ProductPage() {
  const { id } = useParams();
  const { listings, updateSingleListing } = useListingsContext();
  const [isLoading, setIsLoading] = useState(!listings[id]);
  const listingDetails = listings[id];

  const fetchListing = useCallback(async () => {
    setIsLoading(true);
    const url = API_BASE_URL + `/${id}`;
    const res = await fetch(url);
    if (res.ok !== true) {
      throw new Response("Error fetching listing data", { status: res.status });
    };

    const data = await res.json();
    updateSingleListing(data);
    setIsLoading(false);
  }, [id, updateSingleListing]);

  useEffect(() => {
    if (!listings[id]) {
      fetchListing()
    }
  }, [fetchListing, id, listings])

  return useMemo(() => (
    <div className='ProductPageContainer'>
      {isLoading ? (<span>Loading...</span>) : ( 
        <>
          <img src={listingDetails.image} className='ProductImage' alt={`the product ${listingDetails.title}`} />
          <div className='ProductDetails'>
            <span className='ProductCategory'>{listingDetails.category}</span>
            <h1 className='ProductTitle'>{listingDetails.title}</h1>
            <span>ID: {id}</span>
            <span>£{listingDetails.price}</span>
            <p className='ProductDescription'>{listingDetails.description}</p>
          </div>
        </>
      )}
    </div>
  ), [id, isLoading, listingDetails]);
}

export default ProductPage;
