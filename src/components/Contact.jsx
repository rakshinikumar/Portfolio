import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { profile } from '../data/portfolio'
const FORM_ID = import.meta.env.VITE_FORMSPREE_ID
export default function Contact() {
  const [v, setV] = useState({ name: '', email: '', message: '' }), [err, setErr] = useState({}), [status, setStatus] = useState(null)
  const validate = () => {
    const e = {}
    if (v.name.trim().length < 2) e.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address.'
    if (v.message.trim().length < 10) e.message = 'Write at least 10 characters.'
    return e
  }
  const submit = async ev => {
    ev.preventDefault()
    const e = validate(); setErr(e); if (Object.keys(e).length) return
    if (!FORM_ID) { setStatus({ ok: false, text: 'Email delivery is not configured yet, so nothing was sent. Use the email link instead.' }); return }
    setStatus({ ok: null, text: 'Sending…' })
    try {
      const r = await fetch(`https://formspree.io/f/${FORM_ID}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(v) })
      if (!r.ok) throw new Error()
      setStatus({ ok: true, text: 'Message sent. Thank you!' }); setV({ name: '', email: '', message: '' })
    } catch { setStatus({ ok: false, text: 'The message could not be sent. Please email me directly.' }) }
  }
  const f = (k, label, type = 'text') => (
    <label>{label}{k === 'message'
      ? <textarea rows="5" value={v[k]} onChange={e => setV({ ...v, [k]: e.target.value })} aria-invalid={!!err[k]} />
      : <input type={type} value={v[k]} onChange={e => setV({ ...v, [k]: e.target.value })} aria-invalid={!!err[k]} />}
      {err[k] && <span className="err" role="alert">{err[k]}</span>}</label>)
  return (
    <section id="contact" className="container sec contact">
      <div><h2>Let's Create Something Amazing.</h2>
        <ul className="clist">
          <li><Mail size={18} /><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
          <li><Phone size={18} /><a href="tel:+916379549001">{profile.phone}</a></li>
          <li><MapPin size={18} />{profile.home}</li></ul></div>
      <form className="card" onSubmit={submit} noValidate>
        {f('name', 'Name')}{f('email', 'Email', 'email')}{f('message', 'Message')}
        <button className="btn primary" type="submit"><Send size={16} /> Send message</button>
        {status && <p className={`status ${status.ok === false ? 'bad' : ''}`} role="status">{status.text}</p>}
      </form>
    </section>
  )
}
