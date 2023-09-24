import { useMemo } from 'react';
import './styles.css';

function Button({content, ...props}) {
  return useMemo(() => (
    <button className='Button' {...props}>{content}</button>
  ), [content, props]);
}

export default Button;
