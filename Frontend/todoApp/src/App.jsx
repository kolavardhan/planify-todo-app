import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Todo from './pages/Todo'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />

      <Route path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />

      <Route path="/todos" 
        element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default App