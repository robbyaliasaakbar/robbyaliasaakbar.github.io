import { useEffect, useRef, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/shared/Navbar.jsx'
import Footer from './components/shared/Footer.jsx'
import ScrollToTop from './components/shared/ScrollToTop.jsx'

// Home eager (landing page, harus cepat)
import Home from './pages/Home.jsx'

// Semua page lain lazy → bundle terpecah, load on-demand
const Profile = lazy(() => import('./pages/Profile.jsx'))
const ExperimentsList = lazy(() => import('./pages/ExperimentsList.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Exp001 = lazy(() => import('./pages/Exp001.jsx'))
const Exp002 = lazy(() => import('./pages/Exp002.jsx'))
const Exp003 = lazy(() => import('./pages/Exp003.jsx'))
const Exp004 = lazy(() => import('./pages/Exp004.jsx'))
const Exp005 = lazy(() => import('./pages/Exp005.jsx'))
const Exp006 = lazy(() => import('./pages/Exp006.jsx'))
const Exp007 = lazy(() => import('./pages/Exp007.jsx'))
const Exp008 = lazy(() => import('./pages/Exp008.jsx'))
const Exp009 = lazy(() => import('./pages/Exp009.jsx'))
const Exp010 = lazy(() => import('./pages/Exp010.jsx'))
const Exp011 = lazy(() => import('./pages/Exp011.jsx'))
const Exp012 = lazy(() => import('./pages/Exp012.jsx'))
const Exp013 = lazy(() => import('./pages/Exp013.jsx'))
const Exp014 = lazy(() => import('./pages/Exp014.jsx'))
const Exp015 = lazy(() => import('./pages/Exp015.jsx'))
const Exp016 = lazy(() => import('./pages/Exp016.jsx'))
const Exp017 = lazy(() => import('./pages/Exp017.jsx'))

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
  Loading fallback — muncul saat lazy chunk masih di-load.
  Simple spinner, gak nge-block interaksi.
*/
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-neutral-200 border-t-accent rounded-full animate-spin" />
    </div>
  )
}

/*
  M2 — routing.
  Path pakai pola .html (sama kayak website statis lama) biar
  struktur URL konsisten dan deploy nanti gak pusing.

  Performance (M10): React.lazy() untuk semua page kecuali Home.
  Bundle terpecah jadi kecil-kecil, load on-demand per route.
*/
export default function App() {
  return (
    <BrowserRouter>
      <GtagTracker />
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}
