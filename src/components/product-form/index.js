import { useCallback, useMemo, useState } from 'react';
import Button from '../ui/button';
import CategoryFilter from '../category-filter';
import { API_BASE_URL } from '../../utils';
import './styles.css';

const PLCEHOLDER_IMAGE_URL = 'https://fakeimg.pl/400x400?text=No+img';
const DEFAULT_VALUES = {
  title: '',
  price: '',
  category: '',
  image: PLCEHOLDER_IMAGE_URL,
  description: '',
};

function ProductForm({createMode = false, listingDetails, onSubmit}) {
  const [data, setData] = useState(listingDetails || DEFAULT_VALUES);

  const onCreate = useCallback(async (newProductDetails) => {
    try {
      const res = await fetch(API_BASE_URL,{
        method: 'POST',
        body:JSON.stringify(newProductDetails)
      });
      console.debug(res);
      if (!res.ok) {
        throw new Error("Error creating new product");
      };

      const data = await res.json();

      return {
        ...newProductDetails, 
        id: data.id
      };
    } catch (error) {
      console.log(error);
      return;
    }
  }, []);

  const onDetailsUpdate = useCallback(async (newProductDetails) => {
    const url = API_BASE_URL + '/' + newProductDetails.id;
    try {
      const res = await fetch(url,{
        method: 'PUT',
        body:JSON.stringify(newProductDetails)
      });

      if (!res.ok) {
        throw new Error("Error updating listing details");
      };

      return newProductDetails;
    } catch (error) {
      console.log(error);
      return;
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const newData = createMode ? await onCreate(data) : await onDetailsUpdate(data);
    onSubmit(newData);
  }, [createMode, data, onCreate, onDetailsUpdate, onSubmit]);

  const handleChange = useCallback((e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }, [data]);
  
  return useMemo(() => (
    <>
      <img src={data.image} className='ProductImage' alt='the product' />
      <form className='ProductDetails' id='listingDetailsForm' onSubmit={handleSubmit}>
        <CategoryFilter
          value={data.category}
          onChange={handleChange}
        />
        <label htmlFor='title'>Product title:</label>
        <input className='ProductTitle' type='text' name='title' value={data.title} onChange={handleChange}/>
        <label htmlFor='price'>Product price:</label>
        <input type='number' name='price' value={data.price} onChange={handleChange}/>
        <label htmlFor='image'>Product price:</label>
        <input type='url' name='image' value={data.image} onChange={handleChange}/>
        <label htmlFor='description'>Product description:</label>
        <textarea name='description' value={data.description} onChange={handleChange}/>
        <Button content='Save' type="submit" />
      </form>
    </>
  ), [data, handleChange, handleSubmit]);
}

export default ProductForm;
