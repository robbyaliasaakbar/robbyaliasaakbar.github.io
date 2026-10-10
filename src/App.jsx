import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/shared/Navbar.jsx'
import Footer from './components/shared/Footer.jsx'
import ScrollToTop from './components/shared/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import ExperimentsList from './pages/ExperimentsList.jsx'
import Contact from './pages/Contact.jsx'
import Exp001 from './pages/Exp001.jsx'
import Exp002 from './pages/Exp002.jsx'
import Exp003 from './pages/Exp003.jsx'
import Exp004 from './pages/Exp004.jsx'
import Exp005 from './pages/Exp005.jsx'
import Exp006 from './pages/Exp006.jsx'
import Exp007 from './pages/Exp007.jsx'
import Exp008 from './pages/Exp008.jsx'
import Exp009 from './pages/Exp009.jsx'
import Exp010 from './pages/Exp010.jsx'
import Exp011 from './pages/Exp011.jsx'
import Exp012 from './pages/Exp012.jsx'
import Exp013 from './pages/Exp013.jsx'
import Exp014 from './pages/Exp014.jsx'
import Exp015 from './pages/Exp015.jsx'
import Exp016 from './pages/Exp016.jsx'
import Exp017 from './pages/Exp017.jsx'

/*
  GtagTracker — fire GA4 page_view tiap SPA route change.
  Load awal udah ke-track sama gtag config di index.html,
  jadi kita skip event pertama biar gak dobel.
*/
function GtagTracker() {
  const location = useLocation()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      })
    }
  }, [location])

  return null
}

/*
  M2 — routing.
  Path pakai pola .html (sama kayak website statis lama) biar
  struktur URL konsisten dan deploy nanti gak pusing.
*/
export default function App() {
  return (
    <BrowserRouter>
      <GtagTracker />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile.html" element={<Profile />} />
        <Route path="/experiments-list.html" element={<ExperimentsList />} />
        <Route path="/contact.html" element={<Contact />} />
        <Route path="/exp001.html" element={<Exp001 />} />
        <Route path="/exp002.html" element={<Exp002 />} />
        <Route path="/exp003.html" element={<Exp003 />} />
        <Route path="/exp004.html" element={<Exp004 />} />
        <Route path="/exp005.html" element={<Exp005 />} />
        <Route path="/exp006.html" element={<Exp006 />} />
        <Route path="/exp007.html" element={<Exp007 />} />
        <Route path="/exp008.html" element={<Exp008 />} />
        <Route path="/exp009.html" element={<Exp009 />} />
        <Route path="/exp010.html" element={<Exp010 />} />
        <Route path="/exp011.html" element={<Exp011 />} />
        <Route path="/exp012.html" element={<Exp012 />} />
        <Route path="/exp013.html" element={<Exp013 />} />
        <Route path="/exp014.html" element={<Exp014 />} />
        <Route path="/exp015.html" element={<Exp015 />} />
        <Route path="/exp016.html" element={<Exp016 />} />
        <Route path="/exp017.html" element={<Exp017 />} />
        {/* 404 fallback — nanti diisi halaman 404 */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
