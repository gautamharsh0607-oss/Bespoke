import Link from 'next/link'
export default function Home(){
  return (
    <div>
      <header className="header">
        <div className="logo"><img src="/placeholders/logo.png" style={{width:56,height:56,borderRadius:8}} alt="logo" /> <div>BESPOKE CLOTHING</div></div>
        <nav><Link href="/studio"><a className="button">Design your own look in 3D</a></Link></nav>
      </header>
      <main className="layout">
        <div style={{textAlign:'center', marginTop:20}}>
          <h1 style={{fontSize:36}}>Design your own look in 3D.</h1>
          <p style={{color:'#ccc'}}>Luxury, sustainable, and personalized — demo experience.</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginTop:28}}>
          <div className="card"><img src="/placeholders/outfits.jpg" className="thumb" alt="outfits" /><h3>Outfits</h3></div>
          <div className="card"><img src="/placeholders/upper.jpg" className="thumb" alt="upper" /><h3>Upper Wear</h3></div>
          <div className="card"><img src="/placeholders/bottom.jpg" className="thumb" alt="bottom" /><h3>Bottom Wear</h3></div>
        </div>
      </main>
      <footer className="footer">© BESPOKE CLOTHING — Powered by FASHION.TECH</footer>
    </div>
  )
}
