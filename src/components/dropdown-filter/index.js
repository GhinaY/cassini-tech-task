import { useMemo } from 'react';
import './styles.css';

function DropdownFilter(props) {
  const {
    filterName,
    options,
    currentSelection,
    setCurrentSelection,
  } = props;

  return useMemo(() => (
    <div className='DropdownFilterContainer'>
      <span className='FilterName'>{filterName}: </span>
      <select className='FilterSelect' name={filterName} id={filterName} value={currentSelection} onChange={e => setCurrentSelection(e.target.value)}>
        <option value='' key='all'>all</option>
        {options.map((option) => <option value={option} key={option}>{option}</option>)}
      </select>
    </div>
  ), [currentSelection, filterName, options, setCurrentSelection]);
}

export default DropdownFilter;
