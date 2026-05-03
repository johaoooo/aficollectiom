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
import Evenements from './pages/Evenements'
import Contact from './pages/Contact'
import Connexion from './pages/Connexion'
import Inscription from './pages/Inscription'
import Panier from './pages/Panier'
import Admin from './pages/Admin'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="bg-[#D1FAE5] dark:bg-[#064E3B] min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<CatalogueIndex />} />
            <Route path="/catalogue/:id" element={<Catalogue />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/evenements" element={<Evenements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}
