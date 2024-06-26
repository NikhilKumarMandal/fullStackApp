import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import SingUp from './pages/SingUp.jsx'
import SingIn from './pages/SignIn.jsx'
import Home from './pages/Home.jsx'
import { store, persistor } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Dashboard from './pages/Dashboard.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute.jsx'
import CreatePost from './pages/CreatePost.jsx'
import UpdateAvatar from './pages/UpdateAvatar.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
    <Route path='' element={<Home/>} />
    <Route path='/signUp' element={<SingUp/>} />
    <Route path='/signIn' element={<SingIn/>} />
    <Route element={<PrivateRoute/>}>
    <Route path='/dashboard' element={<Dashboard/>} />
    </Route>
    <Route element={<OnlyAdminPrivateRoute/>}>
    <Route path='/createPost' element={<CreatePost/>} />
    </Route>
    <Route path='/updateAvatar' element={<UpdateAvatar/>} />
    
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
</PersistGate>
)