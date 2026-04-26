import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import About from './pages/About'
import Formations from './pages/Formations'
import Galerie from './pages/Galerie'
import Contact from './pages/Contact'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/catalogue/:id" element={<Catalogue />} />
          <Route path="/a-propos"      element={<About />} />
          <Route path="/formations"    element={<Formations />} />
          <Route path="/galerie"       element={<Galerie />} />
          <Route path="/contact"       element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  )
}
