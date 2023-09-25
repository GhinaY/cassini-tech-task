import { createContext, useCallback, useContext, useState } from 'react';

export const ListingsContext = createContext(null);

export const useListingsContext = () => useContext(ListingsContext);

function ListingsContextProvider({children}) {
  const [listings, setListings] = useState({});

  const setListingsFromArray = useCallback((newValuesArray) => {
    const newValuesObject = newValuesArray.reduce((acc, listing) => ({ ...acc, [listing.id]: listing}), {});
    setListings(newValuesObject)
  }, []);

  const updateSingleListing = useCallback((newListingValue) => {
    setListings({
      ...listings,
      [newListingValue.id]: newListingValue,
    })
  }, [listings]);

  return (
     <ListingsContext.Provider value={{listings, setListingsFromArray, updateSingleListing}}>
       {children}
     </ListingsContext.Provider>
   );
};

export default ListingsContextProvider;
