import { writeFileSync, mkdirSync } from 'node:fs'
const SR = 44100, SECS = 8, N = SR * SECS
const data = new Float32Array(N)
for (let i = 0; i < N; i++) {
  const t = i / SR
  const beat = t % 0.5                    // 120 BPM
  const kickEnv = Math.exp(-beat * 18)     // fast-decaying kick
  const kick = Math.sin(2 * Math.PI * 60 * t) * kickEnv * 0.9        // bass
  const bass = Math.sin(2 * Math.PI * 90 * t) * 0.25                 // sustained low
  const midEnv = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.5 * t)
  const mid = Math.sin(2 * Math.PI * 520 * t) * 0.18 * midEnv        // mid pad w/ tremolo
  const spBeat = t % 0.25
  const spEnv = Math.exp(-spBeat * 40)
  const treble = Math.sin(2 * Math.PI * 5200 * t) * spEnv * 0.15      // treble sparkle
  data[i] = Math.max(-1, Math.min(1, kick + bass + mid + treble))
}
// 16-bit PCM mono WAV
const bytesPerSample = 2, dataSize = N * bytesPerSample
const buf = Buffer.alloc(44 + dataSize)
buf.write('RIFF', 0); buf.writeUInt32LE(36 + dataSize, 4); buf.write('WAVE', 8)
buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20)
buf.writeUInt16LE(1, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * bytesPerSample, 28)
buf.writeUInt16LE(bytesPerSample, 32); buf.writeUInt16LE(16, 34)
buf.write('data', 36); buf.writeUInt32LE(dataSize, 40)
for (let i = 0; i < N; i++) buf.writeInt16LE(Math.round(data[i] * 32767), 44 + i * 2)
mkdirSync('public/audio', { recursive: true })
writeFileSync('public/audio/timbre-demo.wav', buf)
console.log('wrote public/audio/timbre-demo.wav', (dataSize / 1024 / 1024).toFixed(2), 'MB')
