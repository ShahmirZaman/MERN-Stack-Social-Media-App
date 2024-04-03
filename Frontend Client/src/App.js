import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={<Profile />} />        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
