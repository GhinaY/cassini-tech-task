import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ListingsContext } from '../../utils/listings-context';
import mockListingsData from '../../utils/test-utils/mock-listings-data';
import ListingsPage from '.';

jest.mock('../../components/product-card', () => ({
  __esModule: true,
  default: ({id}) => (<div>{id}</div>)
}));

jest.mock('../../components/category-filter', () => ({
  __esModule: true,
  default: () => (<div>category filter</div>)
}));

const mockSetListingsFromArray = jest.fn();

function renderListingsPage(props) {
  return (
    render(
      <ListingsContext.Provider value={{
        listings: mockListingsData,
        setListingsFromArray: mockSetListingsFromArray
      }}>
        <MemoryRouter>
          <ListingsPage {...props}/>
        </MemoryRouter>
      </ListingsContext.Provider>
    )
  );
};

describe('ListingsPage', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: async () => []
    }))
  });

  test('renders page title', () => {
    const { asFragment } = renderListingsPage();

    expect(asFragment()).toMatchSnapshot();
  });
});

// Definitely needs a lot more tests, including functional ones, 
// but in the interests of time I'll skip them for now.
