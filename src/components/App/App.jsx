import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Dashboard from '../ProductDashboard/ProductDashboard';
import Cart from '../Cart/Cart';
import RootLayout from '../RootLayout/RootLayout';


function App() {
  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout />}> 
      <Route index element={<Dashboard />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
    </Route>
  ));
  
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;