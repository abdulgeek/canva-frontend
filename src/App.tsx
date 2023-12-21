import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout/Layout'
import Project from './components/Main/Project'
import Templates from './components/Templates/Templates'
import Home from './components/Home/Home'
import CreateDesign from './components/CreateDesign/CreateDesign'
import Main from './pages/Main/Main'
import Index from './pages/Index/Index'
import { useEffect } from 'react'
import { loaduser, logout } from './redux/auth/auth.slice'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import AuthUtils from './utils/auth.utils'
import { RootState, store } from './redux/store'

function App() {
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useAppSelector((state: any) => state.auth)

  const router = createBrowserRouter([{
    path: '/',
    element: user ? <Layout /> : <Index />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/projects',
        element: <Project />,
      },
      {
        path: '/templates',
        element: <Templates />,
      },
    ]
  }, {
    path: '/design/create',
    element: user ? <CreateDesign /> : <Navigate to='/' />
  },
  {
    path: '/design/:design_id/edit',
    element: user ? <Main /> : <Navigate to='/' />
  }])

  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state?.auth?.access_token);

  useEffect(() => {
    // Check if the access token is present in localStorage
    const access_token = localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token") ?? "")
      : "";

    if (token) {
      dispatch(loaduser());
    }
    // If access_token is present, authorize and dispatch action to set isAuthenticated true
    if (access_token && access_token !== "") {
      AuthUtils.setAuthToken();
      AuthUtils.authorize(store);
    } else {
      // If not, dispatch the logout action to clear the user's state and redirect to login
      dispatch(logout());
    }
  }, []);

  return (
    <RouterProvider router={router} />
  )
}

export default App
