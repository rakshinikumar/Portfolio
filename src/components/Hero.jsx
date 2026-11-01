import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FolderGit2, MapPin, Github, Code2, Terminal, Braces, Database } from 'lucide-react'
import { profile } from '../data/portfolio'
function useTyping(words) {
  const [i, setI] = useState(0), [n, setN] = useState(0), [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[i]
    const t = setTimeout(() => {
      if (!del && n < w.length) setN(n + 1)
      else if (!del) setDel(true)
      else if (n > 0) setN(n - 1)
      else { setDel(false); setI((i + 1) % words.length) }
    }, !del && n === w.length ? 1400 : del ? 40 : 80)
    return () => clearTimeout(t)
  }, [n, del, i, words])
  return words[i].slice(0, n)
}
const code = ['const developer = {', '  name: "Rakshini K",', '  stack: ["React", "Node", "MongoDB"],', '  learning: true,', '};']
export default function Hero() {
  const typed = useTyping(profile.roles)
  return (
    <section id="top" className="hero container">
      <div className="hero-text">
        <p className="loc"><MapPin size={16} /> {profile.location}</p>
        <h1>Hi, I'm Rakshini K.</h1>
        <p className="typed" aria-live="off">{typed}<i className="caret" /></p>
        <p className="lead">{profile.tagline}</p>
        <div className="row">
          <a className="btn primary" href={profile.resume} download><Download size={18} /> Download Resume</a>
          <a className="btn" href="#projects"><FolderGit2 size={18} /> Explore My Projects</a>
        </div>
        <div className="row socials">{profile.links.map(l => <a key={l.label} href={l.url} target="_blank" rel="noreferrer"><Github size={16} /> {l.label}</a>)}</div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="glow" />
        <motion.div className="win" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
          <div className="dots"><b /><b /><b /></div>
          {code.map((c, k) => <motion.pre key={k} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 + k * .35 }}>{c}</motion.pre>)}
        </motion.div>
        {[Code2, Terminal, Braces, Database].map((I, k) => (
          <motion.div key={k} className={`float f${k}`} animate={{ y: [0, -14, 0] }} transition={{ duration: 4 + k, repeat: Infinity, ease: 'easeInOut' }}><I size={22} /></motion.div>
        ))}
      </div>
    </section>
  )
}
