import { useState } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import useAuth from './hooks/useAuth'
import PrivateRoutes from './pages/PrivateRoutes'
import Home from './pages/Home'
import Register from './pages/Register'
import Pomodoro from './pages/Pomodoro';

function App() {
  const [logged, setLogged] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login logged setLogged={setLogged}/>}/>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={
          <PrivateRoutes logged={logged}>
            <Pomodoro />
          </PrivateRoutes>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
