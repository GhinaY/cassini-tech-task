import { useMemo } from 'react';
import './styles.css';

function DropdownSelect({
  filterName,
  options,
  setCurrentSelection,
  shouldShowOptionForAll = false, 
...props}) {
  
  return useMemo(() => (
    <div className='DropdownSelectContainer'>
      <span>{filterName}:</span>
      <select 
        className='FilterSelect' 
        name={filterName.toLowerCase()} 
        id={filterName} 
        onChange={e => setCurrentSelection && setCurrentSelection(e.target.value)} 
        {...props}
      >
        {shouldShowOptionForAll && <option value='' key='all'>all</option>}
        {options.map((option) => <option value={option} key={option}>{option}</option>)}
      </select>
    </div>
  ), [filterName, options, props, setCurrentSelection, shouldShowOptionForAll]);
}

export default DropdownSelect;
