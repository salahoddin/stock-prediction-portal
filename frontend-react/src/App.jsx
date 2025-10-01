import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import "./assets/css/style.css"
import { AuthProvider } from "./AuthProvider"
import Home from "./components/Home"
import Register from "./components/Register"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./components/Login"
import Dashboard from "./components/dashboard/Dashboard"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header> </Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          </Routes>
          <Footer> </Footer>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
