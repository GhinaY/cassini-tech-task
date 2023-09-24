import { useMemo } from 'react';
import './styles.css';

function Button({content, onClick}) {
  return useMemo(() => (
    <button className='Button' onClick={onClick}>{content}</button>
  ), [content, onClick]);
}

export default Button;
