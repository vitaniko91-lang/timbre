import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createOrbMaterial } from './orbMaterial'
import { bandsToUniforms } from '../audio/bandsToUniforms'
import type { Bands } from '../audio/computeBands'

interface Props {
  bandsRef: React.RefObject<Bands>
  scrollRef: React.RefObject<number>
  reducedMotion: boolean
}

/** A colorful equirect environment so the glass reflects/refracts a real spectrum
 *  (a neutral studio env leaves the glass looking clear/grey). */
function makeSpectrumEnv() {
  const c = document.createElement('canvas')
  c.width = 1024; c.height = 512
  const ctx = c.getContext('2d')!
  // Match the "SOUND" headline gradient family: indigo -> cyan -> magenta -> violet.
  const g = ctx.createLinearGradient(0, 0, c.width, 0)
  g.addColorStop(0.0, '#5B6CFF')
  g.addColorStop(0.22, '#7EE8FF')
  g.addColorStop(0.45, '#ffffff')
  g.addColorStop(0.62, '#FF4DD2')
  g.addColorStop(0.8, '#A66CFF')
  g.addColorStop(1.0, '#5B6CFF')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, c.width, c.height)
  // bright key band up top, gentle darken toward the base for grounded reflections
  const v = ctx.createLinearGradient(0, 0, 0, c.height)
  v.addColorStop(0, 'rgba(255,255,255,0.95)')
  v.addColorStop(0.32, 'rgba(255,255,255,0.0)')
  v.addColorStop(1, 'rgba(16,12,50,0.35)')
  ctx.fillStyle = v
  ctx.fillRect(0, 0, c.width, c.height)
  const tex = new THREE.CanvasTexture(c)
  tex.mapping = THREE.EquirectangularReflectionMapping
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function LiquidOrb({ bandsRef, scrollRef, reducedMotion }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const mount = mountRef.current!
    const dpr = Math.min(window.devicePixelRatio, 2)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(dpr)
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 3.6

    const pmrem = new THREE.PMREMGenerator(renderer)
    const srcEnv = makeSpectrumEnv()
    const envTex = pmrem.fromEquirectangular(srcEnv).texture
    srcEnv.dispose()
    scene.environment = envTex

    // key + rim lights to give the glass specular pop
    const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(2, 3, 4); scene.add(key)
    const rim = new THREE.DirectionalLight(0xff9ae0, 1.0); rim.position.set(-3, -1, -2); scene.add(rim)

    const geometry = new THREE.IcosahedronGeometry(1, 48)
    const material = createOrbMaterial()
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    io.observe(mount)

    const clock = new THREE.Clock()
    const u = material.userData.uniforms
    const renderOnce = () => renderer.render(scene, camera)

    const onPointer = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect()
      pointerRef.current.x = ((e.clientX - r.left) / r.width) * 2 - 1
      pointerRef.current.y = ((e.clientY - r.top) / r.height) * 2 - 1
    }
    window.addEventListener('pointermove', onPointer)

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      u.uTime.value = clock.getElapsedTime()
      u.uScroll.value = scrollRef.current
      const mapped = bandsToUniforms(bandsRef.current)
      u.uAudioAmp.value += (mapped.uAudioAmp - u.uAudioAmp.value) * 0.14
      u.uSparkle.value += (mapped.uSparkle - u.uSparkle.value) * 0.14
      u.uSpectrum.value.setRGB(mapped.uSpectrum[0], mapped.uSpectrum[1], mapped.uSpectrum[2])
      const p = pointerRef.current
      mesh.rotation.y += 0.0016
      mesh.rotation.x += ((-p.y * 0.3) - mesh.rotation.x) * 0.04
      mesh.rotation.z += ((p.x * 0.25) - mesh.rotation.z) * 0.03
      renderOnce()
    }

    if (reducedMotion) { u.uTime.value = 1.4; renderOnce() } else { loop() }

    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderOnce()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf); io.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      geometry.dispose(); material.dispose(); envTex.dispose(); pmrem.dispose(); renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [bandsRef, scrollRef, reducedMotion])

  return <div ref={mountRef} aria-hidden className="absolute inset-0" />
}
