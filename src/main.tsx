import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { EnokiFlowProvider } from '@mysten/enoki/react'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <EnokiFlowProvider apiKey="enoki_public_10094b0bafc9ba2626fcbc02a1812d6b">
    <App />
    </EnokiFlowProvider>
  // </StrictMode>,
)
