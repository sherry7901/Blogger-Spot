import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signin from './pages/sign-in/Signin';
import Signup from './pages/sign-up/Signup';
import HomePage from './pages/HomePage/HomePage';
import Addyourpost from './components/MainBody/Addnewpost/Addyourpost';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Use effect to check if the user is authenticated (for example, from local storage)
  useEffect(() => {
    const token = localStorage.getItem('token'); // Replace with your authentication token mechanism
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const Router = createBrowserRouter([
    {
      path: '/',
      element: <Signin setIsAuthenticated={setIsAuthenticated} />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/homepage',
      element: isAuthenticated ? <HomePage /> : <Signin setIsAuthenticated={setIsAuthenticated} />,
    },
    {
      path: '/Blog',
      element: isAuthenticated ? <Addyourpost /> : <Signin setIsAuthenticated={setIsAuthenticated} />,
    },
  ]);

  return <RouterProvider router={Router} />;
};

export default App;
