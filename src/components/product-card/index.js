import { useMemo } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

function ProductCard(props) {
  const {
    id,
    title,
    price,
    category,
    description,
    image
  } = props;

  return useMemo(() => (
    <Link to={`/product/${id}`} className='ProductCardContainer'>
      <img src={image} className='ProductImage' alt={`the product ${title}`} />
      <div>
        <span className='ProductCategory'>{category}</span>
        <span className='ProductTitle'>{title}</span>
        <div className='ProductNumbers'>
          <span>ID: {id}</span>
          <span>£{price}</span>
        </div>
        <p className='ProductDescription'>{description}</p>
      </div>
    </Link>
  ), [category, description, id, image, price, title]);
}

export default ProductCard;
