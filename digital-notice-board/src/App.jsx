import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --rose:    #ff6b8a;
    --peach:   #ff9966;
    --amber:   #ffbc42;
    --lime:    #7ecf6a;
    --teal:    #38c9b0;
    --sky:     #56b4f5;
    --violet:  #9b7ff4;
    --pink:    #f472c8;
    --navy:    #1a1a2e;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #fafaf8;
    color: #1a1a1a;
    min-height: 100vh;
  }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* NAV */
  .nav {
    position: sticky; top: 0; z-index: 100;
    background: var(--navy);
    padding: 0 48px; height: 64px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 2px 24px rgba(26,26,46,0.22);
  }
  .nav-brand { display: flex; align-items: center; gap: 10px; }
  .nav-logo {
    width: 34px; height: 34px;
    background: linear-gradient(135deg, var(--rose), var(--violet));
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 10px rgba(155,127,244,0.45);
  }
  .nav-logo svg { width: 16px; height: 16px; fill: #fff; }
  .nav-wordmark {
    font-family: 'Fraunces', serif; font-size: 19px; font-weight: 600;
    color: #fff; letter-spacing: -0.3px;
  }
  .nav-links { display: flex; gap: 4px; list-style: none; }
  .nav-link {
    padding: 6px 16px; border-radius: 8px; font-size: 14px; font-weight: 400;
    color: rgba(255,255,255,0.5); cursor: pointer; border: none; background: none;
    font-family: 'DM Sans', sans-serif; transition: background 0.15s, color 0.15s;
  }
  .nav-link:hover { background: rgba(255,255,255,0.08); color: #fff; }
  .nav-link.active {
    background: linear-gradient(135deg, var(--rose), var(--violet));
    color: #fff; font-weight: 500;
    box-shadow: 0 2px 12px rgba(155,127,244,0.4);
  }
  .nav-badge {
    background: var(--amber); color: var(--navy);
    font-size: 11px; font-weight: 700;
    padding: 3px 11px; border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
  }

  /* HERO BANNER */
  .hero-banner {
    background: linear-gradient(135deg, #1a1a2e 0%, #2d1b5e 55%, #1a2a3e 100%);
    padding: 56px 48px 64px;
    position: relative; overflow: hidden;
  }
  .hero-banner::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 80% 50%, rgba(155,127,244,0.2) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 10% 80%, rgba(255,107,138,0.16) 0%, transparent 60%),
      radial-gradient(ellipse 30% 50% at 50% 0%, rgba(56,201,176,0.12) 0%, transparent 60%);
    pointer-events: none;
  }
  .hero-banner-inner {
    max-width: 1100px; margin: 0 auto;
    display: flex; align-items: flex-start; gap: 64px;
    position: relative;
  }
  .hero { flex: 1; min-width: 0; }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 11px; font-weight: 500; letter-spacing: 0.1em;
    text-transform: uppercase; color: rgba(255,255,255,0.5);
    margin-bottom: 18px; background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 5px 12px; border-radius: 100px;
  }
  .hero-eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #4ade80; animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.8); }
  }
  .hero-heading {
    font-family: 'Fraunces', serif;
    font-size: clamp(34px, 4vw, 50px);
    font-weight: 300; line-height: 1.1; letter-spacing: -1.5px; color: #fff;
    margin-bottom: 14px;
  }
  .hero-heading em {
    font-style: italic;
    background: linear-gradient(90deg, var(--rose), var(--violet));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-subtitle {
    font-size: 15px; line-height: 1.7;
    color: rgba(255,255,255,0.48); max-width: 380px; font-weight: 300;
  }
  .hero-stats {
    display: flex; margin-top: 36px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px; overflow: hidden; max-width: 330px;
  }
  .stat-item {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; gap: 2px; padding: 16px 12px;
    border-right: 1px solid rgba(255,255,255,0.08);
  }
  .stat-item:last-child { border-right: none; }
  .stat-number {
    font-family: 'Fraunces', serif; font-size: 26px;
    font-weight: 600; letter-spacing: -1px;
  }
  .stat-number.cr { color: var(--rose); }
  .stat-number.ca { color: var(--amber); }
  .stat-number.ct { color: var(--teal); }
  .stat-label {
    font-size: 10px; color: rgba(255,255,255,0.38);
    text-transform: uppercase; letter-spacing: 0.08em;
  }

  /* ADD PANEL */
  .add {
    flex: 0 0 360px; background: #fff;
    border-radius: 20px; padding: 26px;
    box-shadow: 0 8px 48px rgba(0,0,0,0.28);
  }
  .add-header { margin-bottom: 16px; }
  .add-title { font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 3px; }
  .add-desc  { font-size: 12px; color: #bbb; font-weight: 300; }
  .add-textarea {
    width: 100%; min-height: 96px; background: #f7f6f2;
    border: 1.5px solid #ebe8e2; border-radius: 12px;
    padding: 13px 15px; font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 300; color: #1a1a1a;
    resize: none; outline: none; margin-bottom: 8px; line-height: 1.6;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .add-textarea::placeholder { color: #ccc; }
  .add-textarea:focus {
    border-color: var(--violet);
    box-shadow: 0 0 0 3px rgba(155,127,244,0.12); background: #fff;
  }
  .add-input {
    width: 100%; background: #f7f6f2;
    border: 1.5px solid #ebe8e2; border-radius: 10px;
    padding: 9px 14px; font-family: 'DM Sans', sans-serif;
    font-size: 13px; color: #1a1a1a; outline: none; margin-bottom: 14px;
    transition: border-color 0.2s;
  }
  .add-input::placeholder { color: #ccc; }
  .add-input:focus { border-color: var(--violet); background: #fff; }
  .tag-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
  .add-footer { display: flex; align-items: center; justify-content: space-between; }
  .char-count { font-size: 12px; color: #ccc; }
  .add-btn {
    background: linear-gradient(135deg, var(--rose), var(--violet));
    color: #fff; border: none; border-radius: 10px;
    padding: 10px 20px; font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500; cursor: pointer;
    display: flex; align-items: center; gap: 6px;
    box-shadow: 0 4px 14px rgba(155,127,244,0.38);
    transition: opacity 0.15s, transform 0.1s, box-shadow 0.15s;
  }
  .add-btn:hover { opacity: 0.88; box-shadow: 0 6px 20px rgba(155,127,244,0.48); }
  .add-btn:active { transform: scale(0.97); }
  .add-btn:disabled { background: #ddd; box-shadow: none; cursor: not-allowed; }

  /* MAIN */
  .main {
    flex: 1; max-width: 1100px; width: 100%;
    margin: 0 auto; padding: 48px 48px 80px;
  }

  /* FILTER */
  .filter-row {
    display: flex; align-items: center; gap: 8px;
    flex-wrap: wrap; margin-bottom: 28px;
  }
  .filter-label {
    font-size: 11px; color: #bbb; text-transform: uppercase;
    letter-spacing: 0.08em; font-weight: 500; margin-right: 2px;
  }
  .filter-btn {
    padding: 5px 14px; border-radius: 100px;
    border: 1.5px solid #e0ddd8; background: transparent;
    font-family: 'DM Sans', sans-serif; font-size: 12px;
    font-weight: 500; color: #999; cursor: pointer; transition: all 0.15s;
  }
  .filter-btn:hover { border-color: #bbb; color: #333; }
  .filter-btn.af { color: #fff; border-color: transparent; box-shadow: 0 2px 10px rgba(0,0,0,0.15); }

  /* BOARD */
  .board-header {
    display: flex; align-items: baseline;
    justify-content: space-between; margin-bottom: 20px;
  }
  .board-title {
    font-family: 'Fraunces', serif; font-size: 22px;
    font-weight: 300; color: #1a1a1a; letter-spacing: -0.5px;
  }
  .board-count { font-size: 13px; color: #bbb; }
  .board {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    gap: 16px;
  }

  /* CARD */
  .card {
    border-radius: 18px; padding: 20px 22px;
    display: flex; flex-direction: column; gap: 12px;
    animation: cardIn 0.32s cubic-bezier(.22,1,.36,1) both;
    position: relative; overflow: hidden;
    border: 1px solid rgba(0,0,0,0.06);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .card::after {
    content: '';
    position: absolute; top: -24px; right: -24px;
    width: 80px; height: 80px;
    border-radius: 50%; opacity: 0.22; pointer-events: none;
  }
  .card:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(0,0,0,0.13); }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(16px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* Card palettes */
  .p-rose   { background: linear-gradient(135deg, #ffe3ea 0%, #ffc8d8 100%); }
  .p-rose::after   { background: #ff6b8a; }
  .p-peach  { background: linear-gradient(135deg, #ffead6 0%, #ffd0ab 100%); }
  .p-peach::after  { background: #ff9966; }
  .p-amber  { background: linear-gradient(135deg, #fff4cc 0%, #ffe799 100%); }
  .p-amber::after  { background: #ffbc42; }
  .p-lime   { background: linear-gradient(135deg, #e2f9d8 0%, #c4edb3 100%); }
  .p-lime::after   { background: #7ecf6a; }
  .p-teal   { background: linear-gradient(135deg, #d4f7f0 0%, #a8eadf 100%); }
  .p-teal::after   { background: #38c9b0; }
  .p-sky    { background: linear-gradient(135deg, #daeeff 0%, #b8dcff 100%); }
  .p-sky::after    { background: #56b4f5; }
  .p-violet { background: linear-gradient(135deg, #eee0ff 0%, #dcc8ff 100%); }
  .p-violet::after { background: #9b7ff4; }
  .p-pink   { background: linear-gradient(135deg, #ffe0f5 0%, #ffc4ec 100%); }
  .p-pink::after   { background: #f472c8; }

  .card-top { display: flex; align-items: center; justify-content: space-between; }
  .card-tag {
    font-size: 10.5px; font-weight: 700; letter-spacing: 0.07em;
    text-transform: uppercase; padding: 4px 10px; border-radius: 100px;
    background: rgba(0,0,0,0.09); color: rgba(0,0,0,0.48);
  }
  .card-body {
    font-size: 14px; line-height: 1.65;
    color: rgba(0,0,0,0.72); font-weight: 400; flex: 1; word-break: break-word;
  }
  .card-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.08);
  }
  .card-author { font-size: 12px; font-weight: 600; color: rgba(0,0,0,0.52); }
  .card-time   { font-size: 11px; color: rgba(0,0,0,0.34); margin-top: 2px; }
  .delete-btn {
    background: rgba(0,0,0,0.08); border: none; border-radius: 8px;
    width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: rgba(0,0,0,0.32);
    transition: background 0.15s, color 0.15s;
  }
  .delete-btn:hover { background: rgba(0,0,0,0.16); color: rgba(0,0,0,0.65); }

  /* EMPTY */
  .empty {
    grid-column: 1 / -1; display: flex; flex-direction: column;
    align-items: center; padding: 72px 24px; text-align: center;
    gap: 10px; border: 2px dashed #e0ddd8; border-radius: 20px;
  }
  .empty-icon {
    font-size: 32px; width: 56px; height: 56px;
    background: linear-gradient(135deg, #ede0ff, #fce7f3);
    border-radius: 14px; display: flex; align-items: center; justify-content: center;
    margin-bottom: 4px;
  }
  .empty-title {
    font-family: 'Fraunces', serif; font-size: 20px;
    font-weight: 300; color: #1a1a1a; letter-spacing: -0.3px;
  }
  .empty-sub { font-size: 13px; color: #bbb; font-weight: 300; }

  /* ABOUT */
  .section-page { animation: cardIn 0.3s ease; }
  .section-heading {
    font-family: 'Fraunces', serif; font-size: 36px;
    font-weight: 300; letter-spacing: -1px; color: #1a1a1a; margin-bottom: 14px;
  }
  .section-body {
    font-size: 15px; font-weight: 300; line-height: 1.8;
    color: #666; max-width: 560px;
  }
  .about-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 16px; margin-top: 36px;
  }
  .about-card {
    border-radius: 16px; padding: 22px;
    border: 1px solid rgba(0,0,0,0.06);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .about-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.09); }
  .about-card-icon { font-size: 24px; margin-bottom: 12px; }
  .about-card-title { font-size: 14px; font-weight: 600; color: #1a1a1a; margin-bottom: 6px; }
  .about-card-desc  { font-size: 13px; color: rgba(0,0,0,0.52); font-weight: 300; line-height: 1.6; }

  /* FOOTER */
  .footer {
    background: var(--navy); text-align: center;
    padding: 20px; font-size: 12px;
    color: rgba(255,255,255,0.22); font-weight: 300;
  }

  @media (max-width: 768px) {
    .nav { padding: 0 20px; }
    .hero-banner { padding: 40px 20px 48px; }
    .hero-banner-inner { flex-direction: column; gap: 32px; }
    .add { flex: unset; width: 100%; }
    .main { padding: 36px 20px 60px; }
    .board { grid-template-columns: 1fr; }
    .hero-stats { max-width: 100%; }
  }
`;

const TAGS = ["General","Urgent","Info","Event","Reminder","Idea","Meeting","Alert"];
const TAG_META = {
  General:  { color: "#9b7ff4", border: "#d4c4ff", bg: "#f0eaff" },
  Urgent:   { color: "#e05252", border: "#f5c6c6", bg: "#fff0f0" },
  Info:     { color: "#2e9de0", border: "#b8d8f5", bg: "#eaf4ff" },
  Event:    { color: "#38a838", border: "#b8e0b8", bg: "#eafaea" },
  Reminder: { color: "#d48a00", border: "#f0d890", bg: "#fffaeb" },
  Idea:     { color: "#e07030", border: "#f5cca8", bg: "#fff3ea" },
  Meeting:  { color: "#18a89a", border: "#a0e0d8", bg: "#eafaf8" },
  Alert:    { color: "#d040a0", border: "#f0b0d8", bg: "#fceaf6" },
};

const PALETTES = ["p-violet","p-rose","p-sky","p-lime","p-amber","p-peach","p-teal","p-pink"];
let palIdx = 0;

const ABOUT_BG = [
  "linear-gradient(135deg,#ede0ff,#dcc8ff)",
  "linear-gradient(135deg,#ffe3ea,#ffc8d8)",
  "linear-gradient(135deg,#daeeff,#b8dcff)",
  "linear-gradient(135deg,#e2f9d8,#c4edb3)",
];

function formatTime(ts) {
  return new Date(ts).toLocaleString("en-IN", {
    day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit",
  });
}

function Trash() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.8 7.5h6.4L11 4"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [notices, setNotices] = useState(() => {
    try { return JSON.parse(localStorage.getItem("dnb_v2") || "[]"); }
    catch { return []; }
  });
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [tag, setTag] = useState("General");
  const [filter, setFilter] = useState("All");

  useEffect(() => { localStorage.setItem("dnb_v2", JSON.stringify(notices)); }, [notices]);

  function addNotice() {
    const trimmed = text.trim();
    if (!trimmed) return;
    const palette = PALETTES[palIdx % PALETTES.length]; palIdx++;
    setNotices(prev => [{ id: Date.now(), text: trimmed, author: author.trim() || "Anonymous", tag, palette, ts: Date.now() }, ...prev]);
    setText(""); setAuthor(""); setTag("General");
  }

  function deleteNotice(id) { setNotices(prev => prev.filter(n => n.id !== id)); }
  function handleKey(e) { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) addNotice(); }

  const usedTags = ["All", ...Array.from(new Set(notices.map(n => n.tag)))];
  const filtered  = filter === "All" ? notices : notices.filter(n => n.tag === filter);

  function Card({ n }) {
    return (
      <div className={`card ${n.palette || "p-violet"}`} key={n.id}>
        <div className="card-top">
          <span className="card-tag">{n.tag}</span>
        </div>
        <p className="card-body">{n.text}</p>
        <div className="card-footer">
          <div>
            <div className="card-author">{n.author}</div>
            <div className="card-time">{formatTime(n.ts)}</div>
          </div>
          <button className="delete-btn" onClick={() => deleteNotice(n.id)} title="Delete"><Trash /></button>
        </div>
      </div>
    );
  }

  function Board({ list }) {
    if (!list.length) return (
      <div className="empty">
        <div className="empty-icon">📋</div>
        <div className="empty-title">{filter === "All" ? "No notices yet" : `No "${filter}" notices`}</div>
        <div className="empty-sub">{filter === "All" ? "Post your first notice using the panel above" : "Try a different filter"}</div>
      </div>
    );
    return list.map(n => <Card key={n.id} n={n} />);
  }

  function Filters() {
    if (!notices.length) return null;
    return (
      <div className="filter-row">
        <span className="filter-label">Filter:</span>
        {usedTags.map(t => {
          const active = filter === t;
          const tm = t !== "All" ? TAG_META[t] : null;
          return (
            <button key={t}
              className={`filter-btn${active ? " af" : ""}`}
              onClick={() => setFilter(t)}
              style={active ? { background: tm ? `linear-gradient(135deg,${tm.color}bb,${tm.color})` : "linear-gradient(135deg,#9b7ff4,#ff6b8a)" } : {}}
            >{t}</button>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="app">

        {/* NAV */}
        <nav className="nav">
          <div className="nav-brand">
            <div className="nav-logo">
              <svg viewBox="0 0 16 16"><rect x="2" y="2" width="12" height="3" rx="1"/><rect x="2" y="7" width="8" height="2" rx="1"/><rect x="2" y="11" width="10" height="2" rx="1"/></svg>
            </div>
            <span className="nav-wordmark">Bulletin</span>
          </div>
          <ul className="nav-links">
            {["home","notices","about"].map(p => (
              <li key={p}>
                <button className={`nav-link${page===p?" active":""}`} onClick={() => setPage(p)}>
                  {p[0].toUpperCase()+p.slice(1)}
                </button>
              </li>
            ))}
          </ul>
          <span className="nav-badge">{notices.length} notices</span>
        </nav>

        {/* HERO BANNER – home only */}
        {page === "home" && (
          <div className="hero-banner">
            <div className="hero-banner-inner">
              <div className="hero">
                <div className="hero-eyebrow"><span className="hero-eyebrow-dot"/>Live Board</div>
                <h1 className="hero-heading">Your's only<br/><em>digital</em> notice board</h1>
                <p className="hero-subtitle">Post announcements, reminders, and updates — all in one colourful, organised space. Everything saves automatically.</p>
                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-number cr">{notices.length}</span>
                    <span className="stat-label">Notices</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number ca">{notices.filter(n=>n.tag==="Urgent"||n.tag==="Alert").length}</span>
                    <span className="stat-label">Urgent</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number ct">{notices.length>0?new Set(notices.map(n=>n.author)).size:0}</span>
                    <span className="stat-label">Authors</span>
                  </div>
                </div>
              </div>

              {/* ADD */}
              <div className="add">
                <div className="add-header">
                  <div className="add-title">Post a notice</div>
                  <div className="add-desc">Cmd + Enter to submit quickly</div>
                </div>
                <textarea className="add-textarea" placeholder="Write your notice here…"
                  value={text} onChange={e=>setText(e.target.value)} onKeyDown={handleKey} maxLength={300}/>
                <input className="add-input" type="text" placeholder="Your name (optional)"
                  value={author} onChange={e=>setAuthor(e.target.value)} maxLength={40}/>
                <div className="tag-row">
                  {TAGS.map(t => {
                    const tm = TAG_META[t]; const sel = tag===t;
                    return (
                      <button key={t} onClick={()=>setTag(t)} style={{
                        padding:"4px 11px", borderRadius:"100px",
                        border:`1.5px solid ${sel?tm.color:tm.border}`,
                        background: sel?tm.bg:"transparent",
                        color: sel?tm.color:"#bbb",
                        fontSize:"11.5px", fontFamily:"'DM Sans',sans-serif",
                        fontWeight:600, cursor:"pointer", transition:"all 0.15s",
                      }}>{t}</button>
                    );
                  })}
                </div>
                <div className="add-footer">
                  <span className="char-count">{text.length}/300</span>
                  <button className="add-btn" onClick={addNotice} disabled={!text.trim()}>
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Post Notice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <main className="main">

          {/* HOME BOARD */}
          {page === "home" && (
            <>
              <div className="board-header">
                <h2 className="board-title">All Notices</h2>
                <span className="board-count">{filtered.length} of {notices.length}</span>
              </div>
              <Filters/>
              <div className="board"><Board list={filtered}/></div>
            </>
          )}

          {/* NOTICES PAGE */}
          {page === "notices" && (
            <div className="section-page">
              <div className="board-header">
                <h2 className="section-heading">All Notices</h2>
                <span className="board-count">{notices.length} total</span>
              </div>
              <Filters/>
              <div className="board"><Board list={filtered}/></div>
            </div>
          )}

          {/* ABOUT PAGE */}
          {page === "about" && (
            <div className="section-page">
              <h2 className="section-heading">About Bulletin</h2>
              <p className="section-body">
                Bulletin is a lightweight digital notice board designed for teams, classrooms, and communities.
                Post updates, share announcements, and keep everyone in the loop — no account needed.
                Everything is stored locally in your browser.
              </p>
              <div className="about-grid">
                {[
                  { icon:"💾", title:"Persists Locally",    desc:"All notices are saved to localStorage and restored automatically on every visit.", ci:0 },
                  { icon:"🏷️", title:"8 Tag Types",         desc:"Classify notices as General, Urgent, Info, Event, Reminder, Idea, Meeting, or Alert.", ci:1 },
                  { icon:"⚡", title:"Instant Posting",     desc:"Use Cmd+Enter (or Ctrl+Enter) to post without leaving the keyboard.", ci:2 },
                  { icon:"🎨", title:"Colour-coded Cards",  desc:"Every notice gets a unique colour palette, making the board vibrant and easy to scan.", ci:3 },
                ].map(f => (
                  <div className="about-card" key={f.title} style={{ background: ABOUT_BG[f.ci] }}>
                    <div className="about-card-icon">{f.icon}</div>
                    <div className="about-card-title">{f.title}</div>
                    <div className="about-card-desc">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <footer className="footer">
          Built with React · Data stored in localStorage · © {new Date().getFullYear()} Bulletin
        </footer>
      </div>
    </>
  );
}