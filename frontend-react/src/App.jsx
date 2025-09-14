import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import "./assets/css/style.css"
import Home from "./components/Home"
import Register from "./components/Register"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./components/Login"
function App() {

  return (
    <>
      <BrowserRouter>
        <Header> </Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        <Footer> </Footer>
      </BrowserRouter>
    </>
  )
}

export default App
