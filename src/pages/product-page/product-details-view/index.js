import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/button';
import './styles.css';

function ProductDetailsView({ listingDetails, setIsEditing }) {
  return useMemo(() => {
    return listingDetails ? (
      <>
        <img src={listingDetails.image} className='ProductImage' alt={`the product ${listingDetails.title}`} />
        <div className='ProductDetails'>
          <Link to={`/`} className='BackButton'>{'<'} Back to listings</Link>
          <span className='ProductCategory'>{listingDetails.category}</span>
          <h1 className='ProductTitle'>{listingDetails.title}</h1>
          <span>ID: {listingDetails.id}</span>
          <span>£{listingDetails.price}</span>
          <p className='ProductDescription'>{listingDetails.description}</p>
          <Button content='Edit' onClick={() => setIsEditing(true)} />
        </div>
      </>
    ) : (<div>No product information available</div>)
  }, [listingDetails, setIsEditing]);
}

export default ProductDetailsView;
