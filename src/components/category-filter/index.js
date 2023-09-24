import { useCallback, useEffect, useState } from 'react';
import DropdownSelect from '../../components/ui/dropdown-filter';
import { API_BASE_URL } from '../../utils';

function CategoryFilter({...props}) {
  const [categoryOptions, setCategoryOptions] = useState([]);

  const fetchCategories = useCallback(async () => {
    const url = API_BASE_URL + '/categories';
    const res = await fetch(url);
    if (res.ok !== true) {
      throw new Response("Error fetching categories", { status: res.status });
    };

    const data = await res.json();
    setCategoryOptions(data);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <DropdownSelect 
      filterName='Category' 
      options={categoryOptions} 
      {...props}
    />
  );
}

export default CategoryFilter;
