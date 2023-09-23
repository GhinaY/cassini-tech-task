import { useMemo } from 'react';
import './styles.css';

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
    <div className='ProductCardContainer'>
      <p>{id}</p>
      <p>{category}</p>
      <h1>{title}</h1>
      <p>{price}</p>
      <img src={image} className='ProductImage' alt={`the product ${title}`} />
      <p>{description}</p>
    </div>
  ), [category, description, id, image, price, title]);
}

export default ProductCard;
