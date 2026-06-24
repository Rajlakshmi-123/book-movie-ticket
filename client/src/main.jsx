import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProviderSafe } from './lib/clerkSafe'

// Import the Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const RootApp = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

if (PUBLISHABLE_KEY) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <ClerkProviderSafe publishableKey={PUBLISHABLE_KEY}>
      {RootApp}
    </ClerkProviderSafe>
  )
} else {
  console.warn('VITE_CLERK_PUBLISHABLE_KEY not set — rendering without ClerkProvider')
  ReactDOM.createRoot(document.getElementById('root')).render(RootApp)
}