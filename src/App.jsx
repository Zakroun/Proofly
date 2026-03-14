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
        
      </Routes>
    </>
  )
}

export default App