import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import ListingsPage from './pages/listings-page';
import ListingsContextProvider from './utils/listings-context';
import ProductPage from './pages/product-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ListingsPage />,
  },
  {
    path: '/product/:id',
    element: <ProductPage />,
  },
  {
    path: '/create',
    element: <ProductPage createMode />,
  },
]);

function App() {
  return (
    <ListingsContextProvider>
      <RouterProvider router={router} />
    </ListingsContextProvider>
  );
}

export default App;
