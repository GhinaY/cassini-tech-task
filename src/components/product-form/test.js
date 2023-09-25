import mockListingsData from '../../utils/test-utils/mock-listings-data';
import ProductForm from './index';
import { render } from '@testing-library/react';

jest.mock('../../components/category-filter', () => ({
  __esModule: true,
  default: () => (<div>category filter</div>)
}));

const mockListingDetails = mockListingsData[0];
const mockOnSubmit = jest.fn();

function renderComponent(props) {
  return(
    render(
      <ProductForm {...props}/>
    )
  );
};

describe('ProductForm', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ id: mockListingsData[0].id })
    })
  });

  it('renders correctly when existing listing data available', () => {
    const { asFragment } = renderComponent({ listingDetails: mockListingDetails, onSubmit: mockOnSubmit });
    
    expect(asFragment()).toMatchSnapshot();
  });
  
  it('renders correctly when no existing listing data available', () => {
    const { asFragment } = renderComponent({ onSubmit: mockOnSubmit });
    
    expect(asFragment()).toMatchSnapshot();
  });
});

// Definitely needs a lot more tests, including functional ones, 
// but in the interests of time I'll skip them for now.
