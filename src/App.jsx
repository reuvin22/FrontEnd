import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./screens/Login"
import HomePage from "./screens/HomePage"
import Register from "./screens/Register"

function App() {
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-gradient-to-r from-slate-400 to-blue-400'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
