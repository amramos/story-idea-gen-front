//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import RootLayout from '../RootLayout/RootLayout';
import StorySearch from '../../pages/StorySearch/StorySearch';
import MyStories from '../../pages/MyStories/MyStories';

function App() {
  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout />}> 
      <Route index element={<StorySearch />}></Route>
      <Route path="/my-stories" element={<MyStories />}></Route>
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