import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Award, GraduationCap, Briefcase, X, Github } from 'lucide-react'
import { about, skills, experience, projects, education, certs, profile } from '../data/portfolio'
const Sec = ({ id, title, children }) => (
  <section id={id} className="container sec"><h2>{title}</h2>{children}</section>
)
export const About = () => (
  <Sec id="about" title="About me">
    <p className="lead">Information Science and Engineering student with a strong foundation in Java, SQL, web technologies, data structures, and object-oriented programming. I enjoy turning ideas into working software and learning new tools along the way.</p>
    <div className="grid info">{about.map(([k, v]) => <div className="card" key={k}><small>{k}</small><p>{v}</p></div>)}</div>
  </Sec>
)
export const Skills = () => (
  <Sec id="skills" title="Skills">
    <div className="grid skills">{skills.map(s => { const I = Icons[s.icon]; return (
      <div className="card hov" key={s.title}><I className="ico" /><h3>{s.title}</h3>
        <div className="chips">{s.items.map(i => <span key={i}>{i}</span>)}</div></div>) })}</div>
  </Sec>
)
export const Experience = () => (
  <Sec id="experience" title="Experience">
    <ol className="timeline"><li><Briefcase className="tl-ico" size={18} />
      <h3>{experience.role}</h3><p className="meta">{experience.company} · {experience.place} · {experience.period}</p>
      <ul>{experience.points.map(p => <li key={p}>{p}</li>)}</ul></li></ol>
  </Sec>
)
export function Projects() {
  const [sel, setSel] = useState(null)
  return (
    <Sec id="projects" title="Projects">
      <div className="bento">{projects.map(p => { const I = Icons[p.icon]; return (
        <motion.button layoutId={p.title} key={p.title} className={`card hov proj ${p.span}`} onClick={() => setSel(p)} aria-label={`Open details: ${p.title}`}>
          <I className="art" /><h3>{p.title}</h3><p>{p.short}</p>
          <div className="chips">{p.tech.map(t => <span key={t}>{t}</span>)}</div></motion.button>) })}</div>
      <AnimatePresence>{sel && (
        <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)}>
          <motion.div className="modal" layoutId={sel.title} role="dialog" aria-modal="true" aria-label={sel.title} onClick={e => e.stopPropagation()}>
            <button className="close" aria-label="Close" onClick={() => setSel(null)}><X /></button>
            <h3>{sel.title}</h3><ul>{sel.details.map(d => <li key={d}>{d}</li>)}</ul>
            <div className="chips">{sel.tech.map(t => <span key={t}>{t}</span>)}</div>
            <a className="btn" href={profile.links[0].url} target="_blank" rel="noreferrer"><Github size={16} /> GitHub profile</a>
          </motion.div></motion.div>)}</AnimatePresence>
    </Sec>
  )
}
export const Education = () => (
  <Sec id="education" title="Education">
    <ol className="timeline">{education.map(e => (
      <li key={e.title}><GraduationCap className="tl-ico" size={18} /><h3>{e.title}</h3>
        <p className="meta">{e.place} · {e.period}</p>{e.note && <p>{e.note}</p>}</li>))}</ol>
  </Sec>
)
export const Certs = () => (
  <Sec id="certifications" title="Certifications">
    <div className="grid certs">{certs.map(([t, o]) => (
      <div className="card hov" key={t}><Award className="ico" /><h3>{t}</h3><p className="meta">{o}</p></div>))}</div>
  </Sec>
)
