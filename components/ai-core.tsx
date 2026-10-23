'use client'
import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { asset } from '@/lib/projects'

function Fallback() { return <img className="core-fallback" src={asset('/images/core.png')} alt="Noyau de filaments métalliques et d’énergie rouge — rendu statique" /> }
class GraphicsBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <Fallback /> : this.props.children }
}
function Nucleus({ reduced, mobile, impulse, hovered }: { reduced: boolean; mobile: boolean; impulse: number; hovered: boolean }) {
  const group = useRef<THREE.Group>(null)
  const particles = useRef<THREE.Points>(null)
  const shock = useRef<THREE.Mesh>(null)
  const light = useRef<THREE.PointLight>(null)
  const burst = useRef(10)
  const elapsed = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const move = (event: PointerEvent) => { pointer.current.x = event.clientX / window.innerWidth * 2 - 1; pointer.current.y = 1 - event.clientY / window.innerHeight * 2 }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])
  useEffect(() => { if (impulse) burst.current = 0 }, [impulse])
  const positions = useMemo(() => {
    const count = mobile ? 90 : 260, array = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) { const t = i * 2.39996, y = 1 - 2 * i / count, r = 2.05 + (i % 7) * .09; array.set([Math.cos(t) * Math.sqrt(1 - y * y) * r, y * r, Math.sin(t) * Math.sqrt(1 - y * y) * r], i * 3) }
    return array
  }, [mobile])
  const shader = useMemo(() => ({ uniforms: { time: { value: 0 }, energy: { value: 0 } }, vertexShader: `uniform float time; uniform float energy; varying float vWave; void main(){ float wave=sin(position.y*8.+time*1.4)*cos(position.x*7.-time)*sin(position.z*6.+time*.7); vWave=wave; vec3 p=position+normal*wave*(.09+energy*.07); gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.); }`, fragmentShader: `varying float vWave; void main(){vec3 c=mix(vec3(.16,.015,.025),vec3(1.,.035,.08),smoothstep(-.7,.8,vWave)); gl_FragColor=vec4(c,.8);}` }), [])
  useFrame((_, delta) => {
    const dt = Math.min(delta, .05)
    if (!reduced) elapsed.current += dt
    const t = elapsed.current
    shader.uniforms.time.value = t
    shader.uniforms.energy.value = THREE.MathUtils.lerp(shader.uniforms.energy.value, hovered ? 1 : 0, .06)
    if (group.current) { group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, reduced ? .2 : pointer.current.y * .23 + .2, .035); group.current.rotation.y = reduced ? .3 : t * .12 + pointer.current.x * .35; const scale = reduced ? 1 : Math.min(1, .65 + t * .4) * (1 + Math.sin(t * 1.8) * .025 + shader.uniforms.energy.value * .045); group.current.scale.setScalar(scale) }
    if (particles.current && !reduced) { const active = document.documentElement.dataset.labSection || 'accueil'; particles.current.rotation.y += dt * (active === 'projets' ? .17 : .055); particles.current.rotation.z = Math.sin(t * .15) * .1 }
    if (light.current) light.current.intensity = 9 + Math.sin(t * 2) * 3 + shader.uniforms.energy.value * 9
    burst.current += dt
    if (shock.current) { const progress = burst.current / 1.3; shock.current.visible = !reduced && progress < 1; shock.current.scale.setScalar(1 + progress * 3.5); (shock.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - progress) }
  })
  return <><ambientLight intensity={.7} /><directionalLight position={[3, 4, 5]} intensity={5} color="#dce5ff" /><directionalLight position={[-3, -2, 2]} intensity={3} color="#8d9bb4" /><pointLight ref={light} position={[1, 0, 2]} color="#ff173e" intensity={12} /><group ref={group} rotation={[.2, .3, 0]}><mesh><sphereGeometry args={[1.04, mobile ? 32 : 64, 32]} /><shaderMaterial {...shader} wireframe transparent /></mesh>{Array.from({ length: mobile ? 5 : 9 }, (_, i) => <mesh key={i} rotation={[i * .63, i * .42, i * .28]}><torusKnotGeometry args={[1.12 + i * .025, .022 + (i % 3) * .007, mobile ? 128 : 220, 6, 2, 3 + i % 3]} /><meshStandardMaterial color={i % 3 ? '#a5acb9' : '#ff2444'} metalness={.94} roughness={.24} emissive={i % 3 ? '#100306' : '#ff002a'} emissiveIntensity={i % 3 ? .1 : 1.6} /></mesh>)}<mesh rotation={[1.1, .2, .3]}><torusGeometry args={[1.8, .008, 6, 120]} /><meshBasicMaterial color="#ff4059" transparent opacity={.5} /></mesh></group><points ref={particles}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial size={.018} color="#ff8294" transparent opacity={.8} sizeAttenuation /></points><mesh ref={shock}><ringGeometry args={[1.5, 1.52, 100]} /><meshBasicMaterial color="#ff3355" transparent opacity={0} side={THREE.DoubleSide} /></mesh></>
}
export default function AICore({ impulse, hovered }: { impulse: number; hovered: boolean }) {
  const host = useRef<HTMLDivElement>(null)
  const [settings, setSettings] = useState<{ supported: boolean; reduced: boolean; mobile: boolean } | null>(null)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)'), mobile = matchMedia('(max-width: 700px)')
    let supported = false
    try { const c = document.createElement('canvas'); const gl = c.getContext('webgl2'); supported = Boolean(gl); gl?.getExtension('WEBGL_lose_context')?.loseContext() } catch {}
    const update = () => setSettings({ supported, reduced: motion.matches, mobile: mobile.matches })
    update(); motion.addEventListener('change', update); mobile.addEventListener('change', update)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    if (host.current) observer.observe(host.current)
    return () => { observer.disconnect(); motion.removeEventListener('change', update); mobile.removeEventListener('change', update) }
  }, [])
  return <div ref={host} className="core-render" aria-hidden="true">{settings?.supported && !settings.reduced ? <GraphicsBoundary><Canvas dpr={[1, settings.mobile ? 1 : 1.5]} frameloop={visible ? 'always' : 'never'} camera={{ position: [0, 0, 6.6], fov: 48 }} gl={{ alpha: true, antialias: !settings.mobile, powerPreference: 'low-power' }}><Nucleus {...settings} impulse={impulse} hovered={hovered} /></Canvas></GraphicsBoundary> : <Fallback />}</div>
}
