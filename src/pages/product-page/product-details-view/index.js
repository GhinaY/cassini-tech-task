import { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/button';
import './styles.css';

function ProductDetailsView({ listingDetails, setIsEditing }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!listingDetails) {
      navigate(-1);
      return;
    };
  }, [listingDetails, navigate])

  return useMemo(() => (
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
  ), [
    listingDetails.image, 
    listingDetails.title, 
    listingDetails.category, 
    listingDetails.id, 
    listingDetails.price, 
    listingDetails.description, 
    setIsEditing
  ]);
}

export default ProductDetailsView;
