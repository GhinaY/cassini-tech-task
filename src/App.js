import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import ListingsPage from './pages/listings-page';
import ListingsContextProvider from './utils/listings-context';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListingsPage />,
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
