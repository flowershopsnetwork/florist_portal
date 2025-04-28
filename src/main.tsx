import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CookiesProvider } from 'react-cookie'
import AppProvider from './context/AppContext.tsx'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <CookiesProvider>
    <AppProvider>
      <App />
      <Toaster />
    </AppProvider>
  </CookiesProvider>,
  
)
