import { render } from '@testing-library/react';
import mockListingsData from '../../../utils/test-utils/mock-listings-data';
import ProductDetailsView from '.';
import { MemoryRouter } from 'react-router-dom';

function renderComponent(props) {
  return(
    render(
      <MemoryRouter>
        <ProductDetailsView {...props}/>
      </MemoryRouter>
    )
  );
};

describe('ProductDetailsView', () => {
  const mockListingDetails = mockListingsData[0];
  const mockSetIsEditing = jest.fn();

  test('renders correctly when listing data is available', () => {
    const { asFragment } = renderComponent({ listingDetails: mockListingDetails, setIsediting: mockSetIsEditing });

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders error message when listing data is not available', () => {
    const { asFragment } = renderComponent({ setIsediting: mockSetIsEditing });

    expect(asFragment()).toMatchSnapshot();
  });
});

// Definitely needs a lot more tests, including functional ones, 
// but in the interests of time I'll skip them for now.
