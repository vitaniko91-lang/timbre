import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
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
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = envTex

    // key + rim lights to give the glass specular pop
    const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(2, 3, 4); scene.add(key)
    const rim = new THREE.DirectionalLight(0x9ab4ff, 1.4); rim.position.set(-3, -1, -2); scene.add(rim)

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
