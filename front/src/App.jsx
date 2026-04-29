import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import CatalogueIndex from './pages/CatalogueIndex'
import About from './pages/About'
import Formations from './pages/Formations'
import Galerie from './pages/Galerie'
import Contact from './pages/Contact'
import Connexion from './pages/Connexion'
import Inscription from './pages/Inscription'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="bg-white dark:bg-white min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<CatalogueIndex />} />
            <Route path="/catalogue/:id" element={<Catalogue />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}
