import { useEffect, useRef } from 'react'

// ---- EDIT YOUR CONTENT HERE ----
const links = {
  github: 'https://github.com/mmehwishh',
  linkedin: 'https://linkedin.com/in/mehwishzehra',
  email: 'mailto:mehwishzehra12345@gmail.com',
}
const projects = [
  { name: 'Verdant Valley', kind: 'Multi-agent AI farming simulation',
    text: 'Agents plan routes with A* search, lay out the farm with constraint satisfaction, and evolve against adversaries with a genetic algorithm on a weighted-terrain grid. A Pygame view animates node exploration, backtracking and evolution across seasons.',
    tags: ['Python', 'A*', 'CSP', 'Genetic Algorithms', 'Pygame'], repo: '', demo: 'https://drive.google.com/file/d/1Fg56cz_M7o1Xy-g6didKkcbx34kCVzwk/view', demoLabel: 'Watch demo video' },
  { name: 'HireHub', kind: 'Online job management system',
    text: 'Full-stack job portal with job posting, applications and skill-based tagging. Employers and candidates talk through real-time chat (SignalR) and AJAX notifications.',
    tags: ['ASP.NET MVC 5', 'Entity Framework', 'SignalR', 'AJAX'], repo: '', demo: 'http://hirehubjobportal.runasp.net/' },
  { name: 'Intelligent Network Management System', kind: 'AI-powered log analysis',
    text: 'Flask app that preprocesses and summarises network logs, detects anomalies, and classifies alerts by severity from Low to Critical with a machine learning model.',
    tags: ['Python', 'Flask', 'Machine Learning', 'Anomaly Detection'], repo: '', demo: 'https://net-ops-intelligent-network-managem-eight.vercel.app/' },
]
const skills = [
  ['Languages', 'C/C++, Python, SQL, JavaScript'],
  ['Web', 'ASP.NET MVC 5, Entity Framework'],
  ['Data & ML', 'Scikit-learn, Pandas, NumPy, Machine Learning'],
  ['Analytics', 'SAP Analytics Cloud, SAP Datasphere, Dashboard Development, Data Visualization'],
  ['Tools', 'Git'],
]
const certs = [
  ['Certified Data Analyst in SAP Analytics Cloud', 'SAP Learning'],
  ['Fundamentals of Agents', 'Hugging Face'],
  ['The Nuts and Bolts of Machine Learning', 'Google Career Certificate'],
  ['Career Essentials in Generative AI', 'LinkedIn Learning'],
  ['Aspire Leadership Program', 'Harvard Business School'],
]

// ---- Hero: live A* pathfinding ----
function PathGrid() {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d')
    const W = 22, H = 12, S = 30, calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    cv.width = W * S; cv.height = H * S
    const start = [0, 5], goal = [W - 1, 6]
    let raf, wait
    const key = (x, y) => y * W + x
    function solve() {
      const wall = new Set()
      for (let i = 0; i < W * H * 0.27; i++) {
        const x = Math.floor(Math.random() * W), y = Math.floor(Math.random() * H)
        if (Math.abs(x - start[0]) + Math.abs(y - start[1]) > 1 && Math.abs(x - goal[0]) + Math.abs(y - goal[1]) > 1) wall.add(key(x, y))
      }
      const h = (x, y) => Math.abs(x - goal[0]) + Math.abs(y - goal[1])
      const g = { [key(...start)]: 0 }, from = {}, open = [[...start]], seen = [], closed = new Set()
      while (open.length) {
        open.sort((a, b) => g[key(...a)] + h(...a) - g[key(...b)] - h(...b))
        const [x, y] = open.shift(), k = key(x, y)
        if (closed.has(k)) continue
        closed.add(k); seen.push(k)
        if (x === goal[0] && y === goal[1]) {
          const path = []; let c = k
          while (c !== undefined) { path.unshift(c); c = from[c] }
          return { wall, seen, path }
        }
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = x + dx, ny = y + dy, nk = key(nx, ny)
          if (nx < 0 || ny < 0 || nx >= W || ny >= H || wall.has(nk) || closed.has(nk)) continue
          const ng = g[k] + 1
          if (g[nk] === undefined || ng < g[nk]) { g[nk] = ng; from[nk] = k; open.push([nx, ny]) }
        }
      }
      return null
    }
    function draw(m, seenN, pathN) {
      ctx.clearRect(0, 0, cv.width, cv.height)
      const cell = (k, col, r = 3) => {
        ctx.fillStyle = col; ctx.beginPath()
        ctx.roundRect((k % W) * S + 2, Math.floor(k / W) * S + 2, S - 4, S - 4, r); ctx.fill()
      }
      for (let k = 0; k < W * H; k++) cell(k, m.wall.has(k) ? '#1b2a41' : '#dde6e1')
      m.seen.slice(0, seenN).forEach(k => cell(k, '#9fd3c7'))
      m.path.slice(0, pathN).forEach(k => cell(k, '#0f766e', 8))
      cell(key(...start), '#f2a541', 14); cell(key(...goal), '#f2a541', 14)
    }
    function run() {
      const m = solve(); if (!m) return run()
      if (calm) return draw(m, m.seen.length, m.path.length)
      let s = 0, p = 0
      const tick = () => {
        if (s < m.seen.length) s += 2
        else if (p < m.path.length) p += 1
        else { wait = setTimeout(run, 2200); return }
        draw(m, s, p); raf = requestAnimationFrame(tick)
      }
      tick()
    }
    run()
    return () => { cancelAnimationFrame(raf); clearTimeout(wait) }
  }, [])
  return <canvas ref={ref} className="grid" role="img" aria-label="Animation of the A* search algorithm finding a path across a grid with obstacles" />
}

export default function App() {
  return (
    <>
      <header className="top">
        <a href="#top" className="mark">Mehwish Zehra</a>
        <nav>
          <a href="#work">Projects</a><a href="#experience">Experience</a>
          <a href="#skills">Skills</a><a href="#contact">Contact</a>
        </nav>
      </header>
      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <h1>I build systems that search, learn and report.</h1>
            <p className="lede">Computer Science student at FAST University, working across machine learning, backend development and data analytics. 4× Dean’s List, CGPA 3.56.</p>
            <div className="cta">
              <a className="btn solid" href="#work">See projects</a>
              <a className="btn" href={links.github}>GitHub</a>
              <a className="btn" href={links.linkedin}>LinkedIn</a>
            </div>
          </div>
          <div className="hero-viz">
            <PathGrid />
            <p className="caption">A* finding a path, live. The same search powers the agents in Verdant Valley.</p>
          </div>
        </section>

        <section id="work">
          <h2>Projects</h2>
          {projects.map(p => (
            <article className="project" key={p.name}>
              <div><h3>{p.name}</h3><p className="kind">{p.kind}</p></div>
              <div>
                <p>{p.text}</p>
                <ul className="tags">{p.tags.map(t => <li key={t}>{t}</li>)}</ul>
                <p className="plinks">
                  {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Source code</a>}
                  {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">{p.demoLabel || 'Live demo'}</a>}
                </p>
              </div>
            </article>
          ))}
        </section>

        <section id="experience">
          <h2>Experience</h2>
          <article className="project">
            <div><h3>K-Electric</h3><p className="kind">Data Analytics Intern<br />Jun 2026 – Aug 2026</p></div>
            <ul className="plain">
              <li>Built interactive dashboards in SAP Analytics Cloud for business reporting and decision-making.</li>
              <li>Used SAP Datasphere for data integration, modeling and preparation.</li>
              <li>Worked with cross-functional teams to turn reporting requirements into faster, clearer dashboards.</li>
            </ul>
          </article>
          <article className="project">
            <div><h3>Education</h3></div>
            <ul className="plain">
              <li><strong>BS Computer Science</strong>, FAST University, 2023 – 2027. CGPA 3.56, 4× consecutive Dean’s List.</li>
              <li><strong>Intermediate (Pre-Engineering)</strong>, TCF College, 2021 – 2023. 82%.</li>
            </ul>
          </article>
        </section>

        <section id="skills">
          <h2>Skills</h2>
          <dl className="skills">{skills.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
          <h3 className="sub">Certifications</h3>
          <ul className="plain certs">{certs.map(([a, b]) => <li key={a}>{a} <span>{b}</span></li>)}</ul>
        </section>

        <section id="contact" className="contact">
          <h2>Let’s talk</h2>
          <p>Open to internships and projects in machine learning, backend and analytics.</p>
          <a className="btn solid" href={links.email}>mehwishzehra12345@gmail.com</a>
        </section>
      </main>
      <footer>© {new Date().getFullYear()} Mehwish Zehra</footer>
    </>
  )
}
