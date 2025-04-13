import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './css/index.css'
import 'react-toastify/dist/ReactToastify.css'
import './css/bootstrap.min.css'

import './App.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import App from './App.jsx'
import StateContext from './state/StateContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StateContext>
      <App />
    </StateContext>
  </StrictMode>,
)
