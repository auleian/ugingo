import { useNavigate } from 'react-router-dom'
import defaultAvatar from '../../assets/avatar-3d-7.png'
import { useAvatar } from '../../lib/avatar'
import { useUserDisplay } from '../../lib/firebase'

export default function WelcomeUser({ name: nameOverride, avatarSrc }) {
  const navigate = useNavigate()
  const avatar = useAvatar()
  const { name: authName } = useUserDisplay()
  // Explicit prop wins; otherwise the signed-in user's name (with email
  // fallback baked into useUserDisplay); 'Friend' last-resort when nothing
  // resolves (e.g., rendered in isolation for design previews).
  const name = nameOverride ?? authName ?? 'Friend'
  // Explicit prop wins; otherwise show the user's picked avatar; otherwise the
  // Figma 3D-avatar placeholder used in this screen's original design.
  const finalAvatar = avatarSrc ?? avatar.src ?? defaultAvatar

  return (
    <div className="flex-1 relative overflow-hidden bg-white">

      {/* Avatar — Figma 829:315 (ellipse 105×105 at left=136 top=197) wrapping 829:317 (3D avatar 95×91 at left=141 top=204) */}
      <div
        className="absolute rounded-full bg-[#F4E1D8] overflow-hidden ring-1 ring-[#E8D5CB]"
        style={{ top: 197, left: 136, width: 105, height: 105 }}
      >
        <img
          src={finalAvatar}
          alt={`${name}'s avatar`}
          className="absolute max-w-none object-cover select-none pointer-events-none"
          style={{ top: 7, left: 5, width: 95, height: 91 }}
          draggable={false}
        />
      </div>

      {/* "Hello, {name}" — Figma 829:313 (centered at x=187 top=419, Raleway Bold 28px lh=36 tracking -0.28px #202020) */}
      <p
        className="absolute -translate-x-1/2 font-raleway font-bold text-center whitespace-nowrap"
        style={{
          left: 187,
          top: 419,
          color: '#202020',
          fontSize: 28,
          lineHeight: '36px',
          letterSpacing: '-0.28px',
        }}
      >
        Hello, {name}
      </p>

      {/* "Welcome to Ugingo" — Figma 829:314 (centered at x=187.5 top=459, Raleway Bold 20px lh=36 tracking -0.28px #202020) */}
      <p
        className="absolute -translate-x-1/2 font-raleway font-bold text-center whitespace-nowrap"
        style={{
          left: 187.5,
          top: 459,
          color: '#202020',
          fontSize: 20,
          lineHeight: '36px',
          letterSpacing: '-0.28px',
        }}
      >
        Welcome to Ugingo
      </p>

      {/* Continue button — Figma 829:316 (212×46 at left=83 top=638, centered +1.5px, rounded-[7px] bg #f7ae2b) */}
      <button
        type="button"
        onClick={() => navigate('/welcome')}
        className="absolute -translate-x-1/2 flex items-center justify-center rounded-[7px] overflow-hidden"
        style={{
          left: 187.5 + 1.5,
          top: 638,
          width: 212,
          height: 46,
          backgroundColor: '#F7AE2B',
        }}
      >
        <span
          className="font-baloo font-normal text-center whitespace-nowrap"
          style={{ color: '#F3F3F3', fontSize: 22, lineHeight: '31px' }}
        >
          Continue
        </span>
      </button>

      {/* Bottom bar — Figma 829:319 (134×5 at left=121 top=798, bg-black rounded-[34px]) */}
      <div
        className="absolute bg-black"
        style={{ top: 798, left: 121, width: 134, height: 5, borderRadius: 34 }}
      />
    </div>
  )
}
