import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import './assets/css/style.css'
import Home from './components/Home'
import Register from './components/Register'
import Header from './components/Header'
import Footer from './components/Footer'
function App() {

  return (
    <>
      <Header> </Header>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      <Footer> </Footer>
    </>
  )
}

export default App
