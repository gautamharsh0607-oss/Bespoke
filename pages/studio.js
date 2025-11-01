import Studio from '../components/Studio'
import { useState, useEffect } from 'react'
import PRODUCTS from '../data/products.json'

const SKIN_RECS = {
  very_light:['#9b4dff','#ff7ab6','#ffffff'],
  light:['#ff2d95','#7f7f7f','#ffffff'],
  medium:['#ff7ab6','#27476b','#111111'],
  tan:['#6c6f3a','#ff2d95','#222222'],
  deep:['#111111','#6b3a3a','#27476b'],
  very_deep:['#222222','#6b3a3a','#111111']
}

export default function StudioPage(){
  const [gender,setGender]=useState('women')
  const [outfit,setOutfit]=useState({})
  const [cart,setCart]=useState([])
  const [skin,setSkin]=useState('medium')

  useEffect(()=>{
    const s = localStorage.getItem('bespoke_demo_state')
    if(s) {
      try{ const p = JSON.parse(s); if(p.outfit) setOutfit(p.outfit); if(p.cart) setCart(p.cart); if(p.skin) setSkin(p.skin) }catch(e){}
    }
  },[])

  useEffect(()=>{ localStorage.setItem('bespoke_demo_state', JSON.stringify({ outfit, cart, skin })) }, [outfit, cart, skin])

  function apply(slot, product){ setOutfit(o=>({...o, [slot]: product})) }
  function remove(slot){ setOutfit(o=>{ const n={...o}; delete n[slot]; return n }) }
  function addToCart(p){ setCart(c=>[...c,p]) }
  function removeFromCart(i){ setCart(c=>c.filter((_,idx)=>idx!==i)) }

  const rec = SKIN_RECS[skin] || SKIN_RECS['medium']

  return (
    <div className="layout">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
        <div style={{display:'flex', alignItems:'center', gap:12}}><img src="/logo.png" style={{width:52,height:52,borderRadius:8}} alt="logo"/><div style={{fontWeight:800}}>bespoke</div></div>
        <div style={{display:'flex', gap:8}}><button onClick={()=>{window.location.href='/'}} className="button">Home</button></div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'320px 1fr 320px', gap:16}}>
        <aside className="card">
          <div style={{fontWeight:700, marginBottom:8}}>Skin Tone</div>
          <div style={{display:'flex', gap:8, marginBottom:12}}>
            {Object.keys(SKIN_RECS).map(k=>(<div key={k} onClick={()=>setSkin(k)} style={{width:36,height:36,borderRadius:18, background:k==='very_light'?'#fff':'#ccc', border:k===skin?'3px solid #ff2d95':''}} title={k}></div>))}
          </div>
          <div style={{marginBottom:8}}>Recommended</div>
          <div style={{display:'flex', gap:8, marginBottom:12}}>
            {rec.map(c=>(<div key={c} style={{width:28,height:28,borderRadius:14, background:c}}/>))}
          </div>

          <div style={{fontWeight:700, marginTop:10}}>Gender</div>
          <div style={{display:'flex', gap:8, marginTop:8}}>
            <button onClick={()=>setGender('women')} className="button" style={{padding:'6px 10px'}}>Women</button>
            <button onClick={()=>setGender('men')} className="button" style={{padding:'6px 10px'}}>Men</button>
          </div>

          <div style={{marginTop:12}}>
            {Object.keys(PRODUCTS[gender]).map(cat=>(
              <div key={cat} style={{marginBottom:12}}>
                <div style={{textTransform:'uppercase', fontSize:12, color:'#ff7ab6', marginBottom:6}}>{cat}</div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                  {PRODUCTS[gender][cat].map(p=>(
                    <div key={p.id} style={{background:'#0b0b0b', padding:8, borderRadius:8}}>
                      <img src={p.thumbnail} style={{width:'100%', height:80, objectFit:'cover', borderRadius:6}} alt="p"/>
                      <div style={{fontSize:13, marginTop:6}}>{p.title}</div>
                      <div style={{display:'flex', gap:6, marginTop:6}}>
                        {p.colors.map(c=>(<div key={c} onClick={()=>apply(cat, {...p, color:c})} style={{width:18,height:18,borderRadius:9, background:c, cursor:'pointer'}} title={c}></div>))}
                      </div>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8}}>
                        <button onClick={()=>addToCart(p)} style={{padding:'6px 8px', background:'#111', borderRadius:6}}>Add</button>
                        <div style={{fontSize:13}}>₹{p.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main>
          <Studio outfit={outfit} />
          <div style={{marginTop:12}} className="card">
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}>
              <div style={{fontWeight:700}}>Applied</div>
              <div className="small">Items: {Object.keys(outfit).length}</div>
            </div>
            <div>
              {Object.entries(outfit).map(([s,p])=>(
                <div key={p.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                  <div style={{display:'flex', gap:8, alignItems:'center'}}><img src={p.thumbnail} style={{width:48,height:48,objectFit:'cover',borderRadius:6}} alt="t"/><div><div>{p.title}</div><div className="small">{s}</div></div></div>
                  <div style={{display:'flex', gap:8, alignItems:'center'}}><div>₹{p.price}</div><button onClick={()=>{ const n={...outfit}; delete n[s]; setOutfit(n); }} style={{padding:'6px 8px', background:'#111', borderRadius:6}}>Remove</button></div>
                </div>
              ))}
              {Object.keys(outfit).length===0 && <div className="small" style={{padding:12}}>No items applied yet.</div>}
            </div>
          </div>
        </main>

        <aside className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
            <div style={{fontWeight:700}}>Cart</div>
            <div className="small">{cart.length} items</div>
          </div>
          <div>
            {cart.map((c,i)=>(
              <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                <div style={{display:'flex', gap:8, alignItems:'center'}}><img src={c.thumbnail} style={{width:48,height:48,objectFit:'cover',borderRadius:6}} alt="c"/><div><div>{c.title}</div><div className="small">{c.colors?.[0]}</div></div></div>
                <div style={{display:'flex', gap:8, alignItems:'center'}}><div>₹{c.price}</div><button onClick={()=>{ const n=cart.slice(); n.splice(i,1); setCart(n); }} style={{padding:'6px 8px', background:'#111', borderRadius:6}}>Remove</button></div>
              </div>
            ))}
            {cart.length===0 && <div className="small" style={{padding:12}}>Cart is empty.</div>}
          </div>
          <div style={{marginTop:12}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><div className="small">Subtotal</div><div className="small">₹{cart.reduce((s,i)=>s+(i.price||0),0)}</div></div>
            <button onClick={()=>alert('Demo checkout — no payment processed.')} className="button" style={{width:'100%', marginTop:8}}>Checkout (Demo)</button>
          </div>
          <div style={{marginTop:12, fontSize:13, color:'rgba(255,255,255,0.7)'}}>Sustainable tags shown under product details.</div>
        </aside>
      </div>

      <footer className="footer">© bespoke — Powered by FASHION.TECH</footer>
    </div>
  )
}
