import './App.css'
import Room from './pages/Room'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './utils/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage/>}></Route>
          
          <Route element={<PrivateRoute/>}>
            <Route path="/" element={<Room/>}>
          </Route>
          </Route>
          
        </Routes>
      </AuthProvider>
    </Router>
    </>
  )
}

export default App
