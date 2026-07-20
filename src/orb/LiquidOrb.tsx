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

const PARTICLES = 7000

/** Fibonacci sphere — evenly distributed points on a unit sphere. */
function buildGeometry() {
  const positions = new Float32Array(PARTICLES * 3)
  const rand = new Float32Array(PARTICLES)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < PARTICLES; i++) {
    const y = 1 - (i / (PARTICLES - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    positions[i * 3] = Math.cos(theta) * r
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = Math.sin(theta) * r
    // deterministic per-particle pseudo-random (no Math.random for reproducibility)
    rand[i] = ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 1))
  return geo
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
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 3.4

    const geometry = buildGeometry()
    const material = createOrbMaterial()
    material.uniforms.uPixelRatio.value = dpr
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    io.observe(mount)

    const clock = new THREE.Clock()
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
      const u = material.uniforms
      const t = clock.getElapsedTime()
      u.uTime.value = t
      u.uScroll.value = scrollRef.current
      u.uReveal.value = Math.min(1, t / 1.6) // entrance: particles assemble over ~1.6s
      const mapped = bandsToUniforms(bandsRef.current)
      u.uAudioAmp.value += (mapped.uAudioAmp - u.uAudioAmp.value) * 0.14
      u.uSparkle.value += (mapped.uSparkle - u.uSparkle.value) * 0.14
      ;(u.uSpectrum.value as THREE.Color).setRGB(mapped.uSpectrum[0], mapped.uSpectrum[1], mapped.uSpectrum[2])
      // gentle auto-rotate + cursor parallax (transform-only)
      const p = pointerRef.current
      points.rotation.y += 0.0016
      points.rotation.x += ((-p.y * 0.3) - points.rotation.x) * 0.04
      points.rotation.z += ((p.x * 0.25) - points.rotation.z) * 0.03
      renderOnce()
    }

    if (reducedMotion) {
      material.uniforms.uReveal.value = 1
      material.uniforms.uTime.value = 1.4
      renderOnce()
    } else {
      loop()
    }

    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderOnce()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      geometry.dispose(); material.dispose(); renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [bandsRef, scrollRef, reducedMotion])

  return <div ref={mountRef} aria-hidden className="absolute inset-0" />
}
