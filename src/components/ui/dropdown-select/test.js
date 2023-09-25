import DropdownSelect from './index';
import { screen, render } from '@testing-library/react';

function renderComponent(props) {
  return(
    render(
      <DropdownSelect {...props}/>
    )
  );
};

describe('DropdownSelect', () => {
  const mockSetCurrentSelection = jest.fn();

  const mockOptions = ['option 1', 'option 2', 'option 3'];

  it('renders correctly with default optionl arguments', () => {
    const { asFragment } = renderComponent({ filterName: 'testDropdown', options: mockOptions, setCurrentSelection: mockSetCurrentSelection });
    
    expect(asFragment()).toMatchSnapshot();
  });
  
  it('has an option for "All" when shouldShowOptionForAll is true', () => {
    renderComponent({ filterName: 'testDropdown', options: mockOptions, setCurrentSelection: mockSetCurrentSelection, shouldShowOptionForAll: true });

    expect(screen.getByText(/all/i)).toBeInTheDocument();
  });
});

// Definitely needs a lot more tests, including functional ones, 
// but in the interests of time I'll skip them for now.
