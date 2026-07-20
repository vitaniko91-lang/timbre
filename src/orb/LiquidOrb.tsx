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

export function LiquidOrb({ bandsRef, scrollRef, reducedMotion }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current!
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 3.2

    const geometry = new THREE.IcosahedronGeometry(1, 24)
    const material = createOrbMaterial()
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    io.observe(mount)

    const clock = new THREE.Clock()
    const renderOnce = () => renderer.render(scene, camera)

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      const u = material.uniforms
      u.uTime.value = clock.getElapsedTime()
      u.uScroll.value = scrollRef.current
      const mapped = bandsToUniforms(bandsRef.current)
      u.uAudioAmp.value += (mapped.uAudioAmp - u.uAudioAmp.value) * 0.15 // smoothing
      u.uSparkle.value += (mapped.uSparkle - u.uSparkle.value) * 0.15
      ;(u.uSpectrum.value as THREE.Color).setRGB(mapped.uSpectrum[0], mapped.uSpectrum[1], mapped.uSpectrum[2])
      mesh.rotation.y += 0.0015
      renderOnce()
    }

    if (reducedMotion) {
      // one static, beautiful frame — no rAF loop
      material.uniforms.uTime.value = 1.2
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
      geometry.dispose(); material.dispose(); renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [bandsRef, scrollRef, reducedMotion])

  return <div ref={mountRef} aria-hidden className="absolute inset-0" />
}
