import React from 'react'
import ReactDOM from 'react-dom/client'

import {CssBaseline} from '@mui/material'
import {BrowserRouter} from 'react-router-dom'

import App from './App.jsx'
import { AuthProvider } from './store/Auth.jsx'
// import { ToastContainer } from 'react-toastify'







ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <React.StrictMode>
    <CssBaseline/>
    <BrowserRouter>

   <App/>

  
    </BrowserRouter>
  </React.StrictMode>,
  </AuthProvider>
)
