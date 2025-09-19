import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import "./assets/css/style.css"
import { AuthProvider } from "./AuthProvider"
import Home from "./components/Home"
import Register from "./components/Register"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./components/Login"
import Dashboard from "./components/dashboard/Dashboard"
function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header> </Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer> </Footer>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
