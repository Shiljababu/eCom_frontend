import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import 'remixicon/fonts/remixicon.css';
import AuthContextApi from './context/AuthContextApi.jsx'
import { CartContext, CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthContextApi>
      <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </CartProvider>
    </AuthContextApi>

  </StrictMode>,
)
