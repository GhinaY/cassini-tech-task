import Button from './index';
import { render } from '@testing-library/react';

function renderComponent(props) {
  return(
    render(
      <Button {...props}/>
    )
  );
};

describe('Button', () => {
  it('renders correctly', () => {
    const { asFragment } = renderComponent({ content: 'test button' });
    
    expect(asFragment()).toMatchSnapshot();
  });
});

// Definitely needs a lot more tests, including functional ones, 
// but in the interests of time I'll skip them for now.
