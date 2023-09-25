import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import ListingsPage from './pages/listings-page';
import ListingsContextProvider from './utils/listings-context';
import ProductPage from './pages/product-page';
import ErrorPage from './pages/error-page';

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
  {
    path: '*',
    element: <ErrorPage error={new Error("Page not found")}/>
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
