export const colors = {
  bg: '#F4F6FF',
  panel: '#E9EDFF',
  ink: '#0E1130',
  muted: '#5B5F7A',
  indigo: '#5B6CFF',
  magenta: '#FF4DD2',
  cyan: '#7EE8FF',
  gold: '#FFD23D',
  mint: '#78FFC8',
  spectrum: ['#FF4DD2', '#7EE8FF', '#FFD23D', '#78FFC8'] as const,
} as const

export const motion = {
  durations: { fast: 200, normal: 400, slow: 600, dramatic: 1000 },
  ease: {
    out: 'cubic-bezier(0.23,1,0.32,1)',
    inOut: 'cubic-bezier(0.77,0,0.175,1)',
  },
} as const
