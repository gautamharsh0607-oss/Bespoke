import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html, useGLTF } from '@react-three/drei'

{/* <ModelSafe src={'/models/human_base.glb'} color={'#f3e6dd'} /> */} {
  if (!src) return null
  try {
    const gltf = useGLTF(src, true)
    if (!gltf || !gltf.scene) return null
    gltf.scene.traverse((c)=>{ if (c.isMesh && c.material && c.material.color) c.material.color.set(color) })
    return <primitive object={gltf.scene} dispose={null} />
  } catch(e) {
    console.warn('Model load failed', src, e)
    return null
  }
}

export default function Studio({ outfit={} }) {
  const active = Object.values(outfit).filter(Boolean)
  return (
    <div className="card">
      <div style={{marginBottom:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontWeight:700}}>Outfit Builder Studio</div>
        <div style={{fontSize:13, color:'rgba(255,255,255,0.7)'}}>Rotate with mouse • Zoom with scroll</div>
      </div>
      <div style={{height:420, borderRadius:8, overflow:'hidden'}}>
        <Canvas camera={{ position: [0, 1.6, 2.6], fov: 35 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5,5,5]} intensity={0.6} />
          <Suspense fallback={<Html center>Loading models...</Html>}>
            <group position={[0,-1.1,0]}>
             {/* <ModelSafe src={'/models/human_base.glb'} color={'#f3e6dd'} /> */}
              {active.map((it,idx)=> <ModelSafe key={idx} src={it.model} color={it.color||'#ffffff'} />)}
            </group>
            <Environment files="/studio_small_03_1k.hdr" />
          </Suspense>
          <OrbitControls enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI/1.9} />
        </Canvas>
      </div>
    </div>
  )
}
