import './App.css'
import Login from './pages/Login/Login.jsx'
import SignUp from './pages/Signup/Signup.jsx'
import Home from './pages/Home/Home.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext.jsx';
import CreateTask from './components/CreateTask.jsx'
import EditTask from './components/EditTask.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  const {authUser} = useAuthContext();
  return (

    <div className="p-4 h-full flex items-center justify-center bg-[#f5e2e3]">
    <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={authUser ? <Navigate to="/"/> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to="/"/> : <SignUp /> } />
        <Route path='/createTask' element={authUser ? <CreateTask/>  :<Login /> } />
        <Route path='/editTask' element={authUser ? <EditTask/>  :<Login /> } />
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App
