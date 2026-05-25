import { useEffect, useRef } from 'react'

interface Props {
  message: string | null
  onDone: () => void
}

export function Toast({ message, onDone }: Props) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!message) return
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(onDone, 1800)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [message, onDone])

  return (
    <div className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-skin pointer-events-none transition-all duration-200 ${message ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      {message ?? ''}
    </div>
  )
}
