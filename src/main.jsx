import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CodeContext } from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <CodeContext>
     <App />
  </CodeContext>
  </BrowserRouter>
)
