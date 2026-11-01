import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
export const sections = ['about', 'skills', 'experience', 'projects', 'education', 'certifications', 'contact']
export default function Navbar() {
  const [open, setOpen] = useState(false), [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    sections.forEach(s => { const el = document.getElementById(s); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <header className="nav"><nav aria-label="Main">
      <a href="#top" className="logo">rakshini<span>.dev</span></a>
      <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <ul className={open ? 'open' : ''}>
        {sections.map(s => <li key={s}><a href={`#${s}`} className={active === s ? 'on' : ''} onClick={() => setOpen(false)}>{s}</a></li>)}
      </ul>
    </nav></header>
  )
}
