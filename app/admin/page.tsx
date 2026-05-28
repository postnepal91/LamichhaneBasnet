'use client';
import { useState, useEffect } from 'react';

const api = async (action: string, extra: any = {}, tokenStr: string) => {
  const res = await fetch('/api/admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenStr}` },
    body: JSON.stringify({ action, ...extra }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Request failed');
  return json;
};

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [inputToken, setInputToken] = useState('');
  const [tab, setTab] = useState<'stats'|'users'|'contacts'|'contributions'>('stats');
  const [data, setData] = useState<any>(null);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lb_session') || '' : '';
    setToken(stored);
    setInputToken(stored);
  }, []);

  const load = async (tabName = tab, tok = token) => {
    if (!tok) return;
    setLoading(true); setError(''); setMsg('');
    try {
      let result;
      if (tabName === 'stats') result = await api('stats', {}, tok);
      else if (tabName === 'users') result = await api('list_users', {}, tok);
      else if (tabName === 'contacts') result = await api('list_contacts', {}, tok);
      else if (tabName === 'contributions') result = await api('list_contributions', {}, tok);
      setData(result);
    } catch (e: any) { setError(e.message); }
    setLoading(false);
  };

  const setRole = async (email: string, role: string) => {
    try { const r = await api('set_role', { email, role }, token); setMsg(r.message); load(); } 
    catch (e: any) { setError(e.message); }
  };

  const reviewContrib = async (submissionId: string, status: string) => {
    try { const r = await api('review_contribution', { submissionId, status }, token); setMsg(r.message); load(); }
    catch (e: any) { setError(e.message); }
  };

  const deleteUser = async (email: string) => {
    if (!confirm(`Delete ${email}?`)) return;
    try { const r = await api('delete_user', { email }, token); setMsg(r.message); load(); }
    catch (e: any) { setError(e.message); }
  };

  const handleTab = (t: typeof tab) => { setTab(t); setData(null); load(t); };

  const s = {
    page: { minHeight:'100vh', background:'#10090a', color:'#f4ead2', fontFamily:'system-ui,sans-serif', padding:'1.5rem' } as React.CSSProperties,
    h1: { color:'#c9a84c', fontFamily:'serif', marginBottom:'1rem' } as React.CSSProperties,
    tabs: { display:'flex', gap:'.5rem', marginBottom:'1.5rem', flexWrap:'wrap' as const },
    tab: (active:boolean) => ({ background: active ? '#c9a84c' : 'transparent', color: active ? '#12080a' : '#c9a84c', border:'1px solid #c9a84c', padding:'.5rem 1rem', borderRadius:'6px', cursor:'pointer' }),
    card: { background:'rgba(255,255,255,.05)', border:'1px solid rgba(201,168,76,.2)', borderRadius:'8px', padding:'1rem', marginBottom:'.75rem' } as React.CSSProperties,
    stat: { textAlign:'center' as const, padding:'1.5rem' },
    statNum: { display:'block', fontSize:'2.5rem', color:'#e8c97a', fontFamily:'serif' },
    grid4: { display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:'1rem', marginBottom:'1.5rem' },
    btn: (color='#c9a84c') => ({ background:'transparent', border:`1px solid ${color}`, color, padding:'.3rem .7rem', borderRadius:'4px', cursor:'pointer', fontSize:'.82rem', marginLeft:'.4rem' }),
    input: { width:'100%', background:'rgba(255,255,255,.07)', border:'1px solid rgba(201,168,76,.3)', color:'#f4ead2', padding:'.65rem .85rem', borderRadius:'6px', marginBottom:'.75rem', boxSizing:'border-box' as const },
    ok: { color:'#92d18b', marginBottom:'.75rem' },
    bad: { color:'#ff9a9a', marginBottom:'.75rem' },
    badge: (s:string) => ({ display:'inline-block', padding:'.2rem .55rem', borderRadius:'4px', fontSize:'.78rem', fontWeight:700, background: s==='approved'?'#1a4a1a':s==='pending'?'#4a3a00':'#4a1a1a', color: s==='approved'?'#92d18b':s==='pending'?'#e8c97a':'#ff9a9a' }),
  };

  if (!token) return (
    <div style={s.page}>
      <h1 style={s.h1}>🛡️ Admin Panel</h1>
      <p style={{color:'#b29a76',marginBottom:'1rem'}}>Paste your admin JWT token to continue:</p>
      <input style={s.input} placeholder="Bearer token..." value={inputToken} onChange={e=>setInputToken(e.target.value)} />
      <button style={s.tab(true)} onClick={()=>{ setToken(inputToken); load('stats', inputToken); }}>Login</button>
    </div>
  );

  return (
    <div style={s.page}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem',flexWrap:'wrap',gap:'.5rem'}}>
        <h1 style={{...s.h1,margin:0}}>🛡️ Admin — LamichhaneBasnet</h1>
        <button style={s.btn('#ff9a9a')} onClick={()=>{ setToken(''); setData(null); }}>Logout</button>
      </div>

      {msg && <p style={s.ok}>✓ {msg}</p>}
      {error && <p style={s.bad}>✗ {error}</p>}

      <div style={s.tabs}>
        {(['stats','users','contacts','contributions'] as const).map(t => (
          <button key={t} style={s.tab(tab===t)} onClick={()=>handleTab(t)}>
            {t==='stats'?'📊 Dashboard':t==='users'?'👥 Users':t==='contacts'?'📬 Messages':'📝 Contributions'}
          </button>
        ))}
        <button style={s.btn()} onClick={()=>load()}>↻ Refresh</button>
      </div>

      {loading && <p style={{color:'#b29a76'}}>Loading...</p>}

      {/* STATS */}
      {tab==='stats' && data && (
        <div style={s.grid4}>
          {[['Users',data.users],['Contacts',data.contacts],['Stories',data.contributions],['Archive',data.archives],['Pending',data.pendingContributions]].map(([label,val])=>(
            <div key={label as string} style={{...s.card,...s.stat}}>
              <span style={s.statNum}>{val}</span>
              <span style={{color:'#b29a76',fontSize:'.85rem'}}>{label as string}</span>
            </div>
          ))}
        </div>
      )}

      {/* USERS */}
      {tab==='users' && data?.users && data.users.map((u:any) => (
        <div key={u._id} style={s.card}>
          <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'.5rem'}}>
            <div>
              <strong>{u.name}</strong> <span style={{color:'#b29a76',fontSize:'.85rem'}}>{u.email}</span>
              <span style={{...s.badge(u.role==='admin'?'approved':'pending'),marginLeft:'.5rem'}}>{u.role}</span>
              {u.branch && <span style={{color:'#b29a76',fontSize:'.82rem',marginLeft:'.5rem'}}>· {u.branch}</span>}
            </div>
            <div>
              {u.role!=='admin' && <button style={s.btn('#92d18b')} onClick={()=>setRole(u.email,'admin')}>Make Admin</button>}
              {u.role==='admin' && <button style={s.btn('#e8c97a')} onClick={()=>setRole(u.email,'member')}>Demote</button>}
              <button style={s.btn('#ff9a9a')} onClick={()=>deleteUser(u.email)}>Delete</button>
            </div>
          </div>
          <p style={{color:'#b29a76',fontSize:'.8rem',margin:'.3rem 0 0'}}>
            {u.authProvider} · {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : ''}
          </p>
        </div>
      ))}

      {/* CONTACTS */}
      {tab==='contacts' && data?.contacts && data.contacts.map((c:any) => (
        <div key={c._id} style={s.card}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <strong>{c.name}</strong>
            <span style={{color:'#b29a76',fontSize:'.82rem'}}>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''}</span>
          </div>
          <p style={{color:'#b29a76',fontSize:'.82rem',margin:'.2rem 0'}}>{c.email} · {c.purpose}</p>
          <p style={{margin:'.4rem 0 0'}}>{c.message}</p>
        </div>
      ))}

      {/* CONTRIBUTIONS */}
      {tab==='contributions' && data?.contributions && (
        <>
          <div style={{display:'flex',gap:'.5rem',marginBottom:'1rem'}}>
            {['all','pending','approved','rejected'].map(s2=>(
              <button key={s2} style={s.btn()} onClick={async()=>{ const r = await api('list_contributions',{status:s2==='all'?undefined:s2},token); setData(r); }}>
                {s2}
              </button>
            ))}
          </div>
          {data.contributions.map((c:any) => (
            <div key={c._id} style={s.card}>
              <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'.5rem'}}>
                <div>
                  <strong>{c.title}</strong>
                  <span style={s.badge(c.status)} >{c.status}</span>
                  <span style={{color:'#b29a76',fontSize:'.82rem',marginLeft:'.5rem'}}>· {c.category}</span>
                </div>
                {c.status==='pending' && (
                  <div>
                    <button style={s.btn('#92d18b')} onClick={()=>reviewContrib(c.submissionId,'approved')}>Approve</button>
                    <button style={s.btn('#ff9a9a')} onClick={()=>reviewContrib(c.submissionId,'rejected')}>Reject</button>
                  </div>
                )}
              </div>
              <p style={{margin:'.5rem 0 0',color:'#d8c6a8'}}>{c.story}</p>
              <p style={{color:'#b29a76',fontSize:'.8rem',margin:'.3rem 0 0'}}>by {c.submittedBy} · {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
