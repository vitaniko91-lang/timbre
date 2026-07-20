interface Props { playing: boolean; onToggle: () => void }
export function PlayButton({ playing, onToggle }: Props) {
  return (
    <button
      type="button"
      aria-pressed={playing}
      aria-label={playing ? 'Pause the track' : 'Play a track'}
      onClick={onToggle}
      className="inline-flex items-center gap-3 rounded-pill bg-ink px-6 py-3 font-sans text-[15px] font-semibold text-white transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 motion-reduce:transform-none"
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white">
        <svg viewBox="0 0 24 24" className="h-3 w-3 fill-ink" aria-hidden>
          {playing ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
        </svg>
      </span>
      {playing ? 'Pause' : 'Play a track'}
    </button>
  )
}
