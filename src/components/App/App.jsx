//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import ProductDashboard from '../../pages/ProductDashboard/ProductDashboard';
import Cart from '../Cart/Cart';
import RootLayout from '../RootLayout/RootLayout';
import StorySearch from '../../pages/StorySearch/StorySearch';


function App() {
  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout />}> 
      <Route index element={<ProductDashboard />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/story-search" element={<StorySearch />}></Route>
    </Route>
  ));
  
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;