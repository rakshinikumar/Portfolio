import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Contact from './components/Contact.jsx'
import { About, Skills, Experience, Projects, Education, Certs } from './components/Sections.jsx'
export default function App() {
  const [top, setTop] = useState(false)
  useEffect(() => {
    const s = () => setTop(window.scrollY > 600); window.addEventListener('scroll', s, { passive: true })
    let m
    if (matchMedia('(pointer:fine)').matches) {
      m = e => { const r = document.documentElement.style; r.setProperty('--mx', e.clientX + 'px'); r.setProperty('--my', e.clientY + 'px') }
      window.addEventListener('pointermove', m)
    }
    return () => { window.removeEventListener('scroll', s); m && window.removeEventListener('pointermove', m) }
  }, [])
  return (<>
    <div className="bg" aria-hidden="true" /><div className="spot" aria-hidden="true" />
    <Navbar /><main><Hero /><About /><Skills /><Experience /><Projects /><Education /><Certs /><Contact /></main>
    <footer>© {new Date().getFullYear()} Rakshini K</footer>
    {top && <button className="totop" aria-label="Back to top" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp /></button>}
  </>)
}
