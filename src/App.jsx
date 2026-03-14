import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
// layout
import Navbar from "./layout/Navbar"
import Footer from "./layout/Footer"
// Auth
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import { Routes, Route } from "react-router-dom"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
        <Route path="/features" element={<><Navbar /><Features /><Footer /></>} />
        <Route path="/pricing" element={<><Navbar /><Pricing /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  )
}

export default App