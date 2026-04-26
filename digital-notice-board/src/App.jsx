import { useState, useEffect, useRef } from "react";
 
// ─── Mock user database ────────────────────────────────────────────────────
const USERS = [
  { id: 1, username: "admin", password: "admin123", role: "Admin", avatar: "A" },
  { id: 2, username: "teacher", password: "teach123", role: "Teacher", avatar: "T" },
  { id: 3, username: "student", password: "student1", role: "Student", avatar: "S" },
];
 
const INITIAL_NOTICES = [
  {
    id: 1, title: "Annual Sports Day", category: "Events",
    body: "Annual Sports Day will be held on May 10th. All students must register by May 5th. Participation is mandatory for all classes.",
    author: "Admin", date: "Apr 25, 2026", pinned: true, color: "#f97316",
  },
  {
    id: 2, title: "Library Closed – Maintenance", category: "Announcement",
    body: "The library will remain closed from April 28–30 for annual maintenance. Digital resources remain accessible via the portal.",
    author: "Admin", date: "Apr 24, 2026", pinned: false, color: "#3b82f6",
  },
  {
    id: 3, title: "Mid-Term Exam Schedule", category: "Academics",
    body: "Mid-term examinations begin May 15th. Timetables are available on the portal. Students are advised to begin preparation immediately.",
    author: "Teacher", date: "Apr 23, 2026", pinned: true, color: "#8b5cf6",
  },
  {
    id: 4, title: "New Cafeteria Menu", category: "General",
    body: "Starting May 1st, the cafeteria will offer an expanded menu with healthy options. Feedback forms available at the counter.",
    author: "Admin", date: "Apr 22, 2026", pinned: false, color: "#10b981",
  },
];
 
const CATEGORIES = ["All", "Events", "Announcement", "Academics", "General"];
 
// ─── Styles ────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
 
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
  :root {
    --bg: #0f0e17;
    --surface: #1a1929;
    --surface2: #221f35;
    --border: rgba(255,255,255,0.07);
    --text: #fffffe;
    --muted: #a7a5c0;
    --accent: #ff6b35;
    --accent2: #e53170;
    --gold: #f4c842;
  }
 
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }
 
  /* ── Login ── */
  .login-wrap {
    min-height: 100vh;
    display: grid;
    place-items: center;
    background: radial-gradient(ellipse at 60% 40%, #1e1040 0%, #0f0e17 70%);
    position: relative;
    overflow: hidden;
  }
  .login-wrap::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%);
    top: -100px; right: -100px;
    pointer-events: none;
  }
  .login-wrap::after {
    content: '';
    position: absolute;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(229,49,112,0.1) 0%, transparent 70%);
    bottom: -100px; left: -80px;
    pointer-events: none;
  }
  .login-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 48px 44px;
    width: 420px;
    max-width: 94vw;
    position: relative;
    z-index: 1;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5);
    animation: slideUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .login-logo {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 8px;
  }
  .login-logo-icon {
    width: 40px; height: 40px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 10px;
    display: grid; place-items: center;
    font-size: 20px;
  }
  .login-logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    letter-spacing: -0.5px;
  }
  .login-sub {
    color: var(--muted);
    font-size: 14px;
    margin-bottom: 36px;
    margin-top: 4px;
  }
  .login-label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--muted);
    margin-bottom: 8px;
    display: block;
  }
  .login-input {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 13px 16px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s;
    margin-bottom: 20px;
  }
  .login-input:focus { border-color: var(--accent); }
  .login-btn {
    width: 100%;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border: none;
    border-radius: 10px;
    padding: 14px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    margin-top: 4px;
  }
  .login-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .login-btn:active { transform: translateY(0); }
  .login-error {
    background: rgba(229,49,112,0.15);
    border: 1px solid rgba(229,49,112,0.3);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    color: #f87171;
    margin-bottom: 20px;
  }
  .login-hint {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--border);
    font-size: 12px;
    color: var(--muted);
    line-height: 1.8;
  }
  .login-hint strong { color: var(--text); }
 
  /* ── App Shell ── */
  .app { display: flex; flex-direction: column; min-height: 100vh; }
 
  /* ── Header ── */
  .header {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 32px;
    height: 64px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 100;
    backdrop-filter: blur(12px);
  }
  .header-left { display: flex; align-items: center; gap: 12px; }
  .header-logo {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 9px;
    display: grid; place-items: center;
    font-size: 18px;
  }
  .header-title {
    font-family: 'Playfair Display', serif;
    font-size: 19px;
    letter-spacing: -0.3px;
  }
  .header-right { display: flex; align-items: center; gap: 16px; }
  .user-chip {
    display: flex; align-items: center; gap: 8px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 6px 14px 6px 8px;
    font-size: 13px;
  }
  .user-avatar {
    width: 26px; height: 26px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 50%;
    display: grid; place-items: center;
    font-size: 12px; font-weight: 700;
  }
  .logout-btn {
    background: none;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 7px 14px;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .logout-btn:hover { border-color: var(--accent2); color: var(--accent2); }
 
  /* ── Main ── */
  .main { flex: 1; padding: 32px; max-width: 1200px; margin: 0 auto; width: 100%; }
 
  /* ── Toolbar ── */
  .toolbar {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 28px; gap: 16px; flex-wrap: wrap;
  }
  .toolbar-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .cat-btn {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 7px 16px;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .cat-btn.active {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-color: transparent;
    color: #fff;
    font-weight: 600;
  }
  .cat-btn:hover:not(.active) { border-color: var(--accent); color: var(--text); }
  .add-btn {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex; align-items: center; gap: 6px;
    transition: opacity 0.2s, transform 0.15s;
  }
  .add-btn:hover { opacity: 0.9; transform: translateY(-1px); }
 
  /* ── Grid ── */
  .notices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  .notice-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    animation: fadeIn 0.4s ease both;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .notice-card:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
  .notice-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 4px; height: 100%;
    background: var(--card-color);
  }
  .notice-pin {
    position: absolute; top: 16px; right: 16px;
    font-size: 18px;
  }
  .notice-cat {
    display: inline-block;
    background: rgba(255,255,255,0.06);
    border-radius: 999px;
    padding: 3px 10px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--muted);
    margin-bottom: 12px;
  }
  .notice-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    line-height: 1.3;
    margin-bottom: 10px;
  }
  .notice-body {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 18px;
  }
  .notice-footer {
    display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid var(--border);
    padding-top: 14px;
    font-size: 12px;
    color: var(--muted);
  }
  .notice-author { display: flex; align-items: center; gap: 6px; }
  .notice-author-dot {
    width: 20px; height: 20px;
    background: var(--surface2);
    border-radius: 50%;
    display: grid; place-items: center;
    font-size: 9px; font-weight: 700; color: var(--muted);
  }
  .notice-actions { display: flex; gap: 8px; }
  .icon-btn {
    background: none; border: none; cursor: pointer;
    color: var(--muted); font-size: 14px;
    padding: 4px 6px; border-radius: 6px;
    transition: all 0.15s;
  }
  .icon-btn:hover { background: rgba(255,255,255,0.06); color: var(--text); }
  .icon-btn.delete:hover { color: #f87171; }
 
  /* ── Modal ── */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(6px);
    display: grid; place-items: center;
    z-index: 200;
    animation: fadeOverlay 0.2s ease;
  }
  @keyframes fadeOverlay { from { opacity: 0; } to { opacity: 1; } }
  .modal {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 40px;
    width: 500px;
    max-width: 96vw;
    animation: slideUp 0.3s cubic-bezier(0.22,1,0.36,1) both;
  }
  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px; margin-bottom: 28px;
  }
  .form-row { margin-bottom: 18px; }
  .form-label {
    font-size: 12px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 1px;
    color: var(--muted); display: block; margin-bottom: 8px;
  }
  .form-input, .form-select, .form-textarea {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--accent); }
  .form-textarea { resize: vertical; min-height: 100px; }
  .form-select option { background: var(--surface2); }
  .modal-actions { display: flex; gap: 12px; margin-top: 8px; justify-content: flex-end; }
  .btn-ghost {
    background: none; border: 1px solid var(--border);
    border-radius: 10px; padding: 11px 20px;
    color: var(--muted); font-family: 'DM Sans', sans-serif;
    font-size: 14px; cursor: pointer; transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: var(--muted); color: var(--text); }
  .btn-primary {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border: none; border-radius: 10px;
    padding: 11px 24px;
    color: #fff; font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600; cursor: pointer;
    transition: opacity 0.2s;
  }
  .btn-primary:hover { opacity: 0.9; }
 
  /* ── Empty ── */
  .empty {
    text-align: center; padding: 80px 20px; color: var(--muted);
  }
  .empty-icon { font-size: 48px; margin-bottom: 16px; }
  .empty h3 { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--text); margin-bottom: 8px; }
  .empty p { font-size: 14px; }
 
  /* ── Color swatches ── */
  .color-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .color-swatch {
    width: 28px; height: 28px; border-radius: 50%;
    cursor: pointer; border: 3px solid transparent;
    transition: transform 0.15s;
  }
  .color-swatch.selected { border-color: #fff; transform: scale(1.15); }
`;
 
const COLORS = ["#f97316","#3b82f6","#8b5cf6","#10b981","#f59e0b","#ef4444","#06b6d4","#ec4899"];
 
export default function App() {
  const [user, setUser] = useState(null);
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editNotice, setEditNotice] = useState(null);
 
  // login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
 
  // new/edit form
  const [form, setForm] = useState({ title:"", body:"", category:"Events", color: COLORS[0], pinned: false });
 
  const handleLogin = () => {
    const found = USERS.find(u => u.username === username && u.password === password);
    if (found) { setUser(found); setLoginError(""); }
    else setLoginError("Invalid username or password. Please try again.");
  };
 
  const handleLogout = () => { setUser(null); setUsername(""); setPassword(""); };
 
  const openAdd = () => {
    setEditNotice(null);
    setForm({ title:"", body:"", category:"Events", color: COLORS[0], pinned: false });
    setShowModal(true);
  };
 
  const openEdit = (n) => {
    setEditNotice(n);
    setForm({ title: n.title, body: n.body, category: n.category, color: n.color, pinned: n.pinned });
    setShowModal(true);
  };
 
  const handleSave = () => {
    if (!form.title.trim() || !form.body.trim()) return;
    if (editNotice) {
      setNotices(prev => prev.map(n => n.id === editNotice.id ? { ...n, ...form } : n));
    } else {
      const now = new Date().toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" });
      setNotices(prev => [{ id: Date.now(), ...form, author: user.role, date: now }, ...prev]);
    }
    setShowModal(false);
  };
 
  const handleDelete = (id) => setNotices(prev => prev.filter(n => n.id !== id));
  const togglePin = (id) => setNotices(prev => prev.map(n => n.id === id ? {...n, pinned: !n.pinned} : n));
 
  const visible = notices
    .filter(n => category === "All" || n.category === category)
    .sort((a, b) => b.pinned - a.pinned);
 
  const canEdit = user && (user.role === "Admin" || user.role === "Teacher");
 
  if (!user) {
    return (
      <>
        <style>{css}</style>
        <div className="login-wrap">
          <div className="login-card">
            <div className="login-logo">
              <div className="login-logo-icon">📋</div>
              <span className="login-logo-text">NoticeBoardX</span>
            </div>
            <p className="login-sub">Sign in to access your digital notice board</p>
 
            {loginError && <div className="login-error">{loginError}</div>}
 
            <label className="login-label">Username</label>
            <input
              className="login-input"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              autoFocus
            />
            <label className="login-label">Password</label>
            <input
              className="login-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
            />
            <button className="login-btn" onClick={handleLogin}>Sign In →</button>
 
            <div className="login-hint">
              <strong>Demo accounts:</strong><br/>
              admin / admin123 &nbsp;·&nbsp; teacher / teach123 &nbsp;·&nbsp; student / student1
            </div>
          </div>
        </div>
      </>
    );
  }
 
  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <div className="header-logo">📋</div>
            <span className="header-title">NoticeBoardX</span>
          </div>
          <div className="header-right">
            <div className="user-chip">
              <div className="user-avatar">{user.avatar}</div>
              <span>{user.username}</span>
              <span style={{color:"var(--muted)", fontSize:11}}>· {user.role}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Sign out</button>
          </div>
        </header>
 
        <main className="main">
          {/* Toolbar */}
          <div className="toolbar">
            <div className="toolbar-left">
              {CATEGORIES.map(c => (
                <button key={c} className={`cat-btn ${category === c ? "active" : ""}`} onClick={() => setCategory(c)}>{c}</button>
              ))}
            </div>
            {canEdit && <button className="add-btn" onClick={openAdd}>＋ Post Notice</button>}
          </div>
 
          {/* Grid */}
          {visible.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">🗒️</div>
              <h3>No notices here</h3>
              <p>There are no notices in this category yet.</p>
            </div>
          ) : (
            <div className="notices-grid">
              {visible.map((n, i) => (
                <div
                  key={n.id}
                  className="notice-card"
                  style={{ "--card-color": n.color, animationDelay: `${i * 60}ms` }}
                >
                  {n.pinned && <div className="notice-pin">📌</div>}
                  <div className="notice-cat">{n.category}</div>
                  <div className="notice-title">{n.title}</div>
                  <div className="notice-body">{n.body}</div>
                  <div className="notice-footer">
                    <div className="notice-author">
                      <div className="notice-author-dot">{n.author[0]}</div>
                      <span>{n.author} · {n.date}</span>
                    </div>
                    {canEdit && (
                      <div className="notice-actions">
                        <button className="icon-btn" title={n.pinned ? "Unpin" : "Pin"} onClick={() => togglePin(n.id)}>{n.pinned ? "📍" : "📌"}</button>
                        <button className="icon-btn" title="Edit" onClick={() => openEdit(n)}>✏️</button>
                        <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(n.id)}>🗑️</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
 
      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-title">{editNotice ? "Edit Notice" : "Post a Notice"}</div>
            <div className="form-row">
              <label className="form-label">Title</label>
              <input className="form-input" placeholder="Notice title" value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
            </div>
            <div className="form-row">
              <label className="form-label">Category</label>
              <select className="form-select" value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}>
                {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" placeholder="Write the notice content..." value={form.body} onChange={e => setForm(f => ({...f, body: e.target.value}))} />
            </div>
            <div className="form-row">
              <label className="form-label">Color Tag</label>
              <div className="color-row">
                {COLORS.map(c => (
                  <div key={c} className={`color-swatch ${form.color === c ? "selected" : ""}`} style={{ background: c }} onClick={() => setForm(f => ({...f, color: c}))} />
                ))}
              </div>
            </div>
            <div className="form-row" style={{display:"flex", alignItems:"center", gap:10}}>
              <input type="checkbox" id="pin" checked={form.pinned} onChange={e => setForm(f => ({...f, pinned: e.target.checked}))} />
              <label htmlFor="pin" className="form-label" style={{margin:0, cursor:"pointer"}}>Pin this notice to top</label>
            </div>
            <div className="modal-actions">
              <button className="btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>{editNotice ? "Save Changes" : "Post Notice"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
 
