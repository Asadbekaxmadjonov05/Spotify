import {}  from 'react'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
 const code = new URLSearchParams(location.search).get("code") 
  return code ? <Dashboard code={code}/> : <Login/> 
}

export default App
