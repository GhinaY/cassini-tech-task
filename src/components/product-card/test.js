import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import mockListingsData from '../../utils/test-utils/mock-listings-data';
import ProductCard from '.';

const mockListingDetails = mockListingsData[0];

function renderComponent(props) {
  return render(
    <MemoryRouter>
      <ProductCard {...props} />
    </MemoryRouter>
  );
};

describe('ProductCard', () => {

  test('renders correctly', () => {
    const { asFragment } = renderComponent(mockListingDetails);

    expect(asFragment()).toMatchSnapshot();
  });
});

// Definitely needs a lot more tests, including functional ones, 
// but in the interests of time I'll skip them for now.
