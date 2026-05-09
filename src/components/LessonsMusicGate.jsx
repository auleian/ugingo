// Tiny loading screen shown while we wait for at least 5 seconds of
// lessons-music to buffer. Sits inside the topic Frame in place of the lesson
// content, so the lesson can't be interacted with until music is ready.

import Mascot from './Mascot'

export default function LessonsMusicGate() {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-white">
      <Mascot variant="default" size={70} withCircle={false} />
      <div
        className="mt-6 rounded-full border-4 border-[#f16522]/20 border-t-[#f16522] animate-spin"
        style={{ width: 36, height: 36 }}
        aria-hidden
      />
      <p
        className="mt-4 font-poppins font-black text-[#2e4858]"
        style={{ fontSize: 14 }}
        role="status"
        aria-live="polite"
      >
        Tugende…
      </p>
    </div>
  )
}
