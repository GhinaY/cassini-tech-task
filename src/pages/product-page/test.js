import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import { ListingsContext } from '../../utils/listings-context';
import mockListingsData from '../../utils/test-utils/mock-listings-data';
import ProductPage from './index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../../components/category-filter', () => ({
  __esModule: true,
  default: () => (<div>category filter</div>)
}));

const mockSetListingsFromArray = jest.fn();

function renderComponent(props) {
  return(
    render(
      <ListingsContext.Provider value={{
        listings: mockListingsData,
        setListingsFromArray: mockSetListingsFromArray
      }}>
        <MemoryRouter>
          <ProductPage {...props}/>
        </MemoryRouter>
      </ListingsContext.Provider>
    )
  );
};

describe('ProductPage', () => {
  test('renders product details correctly when data is in context and id is provided in the path params', () => {
    useParams.mockImplementation(() => ({ id: mockListingsData[0].id }));
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders loading state when id is provided in the path params but data is not in context', () => {
    useParams.mockImplementation(() => ({ id: 12345678 }));
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders editing state with no prefills when creationMode is true', () => {
    useParams.mockImplementation(() => ({}));
    const { asFragment } = renderComponent({ createMode: true });

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders editing state with prefills when the Edit button is clicked', () => {
    useParams.mockImplementation(() => ({ id: mockListingsData[0].id }));
    const { asFragment } = renderComponent();

    act(() => {
      fireEvent.click(screen.getByText(/edit/i, { selector: 'button' }));
    })

    expect(asFragment()).toMatchSnapshot();
  });
});

// Definitely needs a lot more tests, including functional ones, 
// but in the interests of time I'll skip them for now.
