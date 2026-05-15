import { Link } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import cartIconUrl from '../assets/shop-cart-icon.svg'
import { totalCount, useCart } from '../lib/cart'

const APP_GRADIENT =
  'linear-gradient(117.127deg, rgb(243, 232, 255) 0%, rgb(252, 231, 243) 50%, rgb(254, 249, 194) 100%)'
const HERO_GRADIENT =
  'linear-gradient(145.572deg, rgb(190, 219, 255) 0%, rgb(233, 212, 255) 100%)'
const FOOTER_GRADIENT = 'linear-gradient(to right, #ad46ff, #f6339a)'

const COMING_SOON = [
  { y: 476, leftCard: 24, emoji: '🎴', title: 'Ugingo Flashcards', desc: 'Fun learning cards with colorful illustrations', price: 'UGX 3,500', plain: true },
  { y: 880, leftCard: 27, emoji: '📖', title: 'Activity Book', desc: 'Practice writing and drawing with Ugingo', price: 'UGX 4,000' },
  { y: 1284, leftCard: 27, emoji: '🧸', title: 'Ugingo Plushie', desc: 'Cuddly companion for your learning journey', price: 'UGX 8,000' },
]

export default function Shop() {
  useCart()
  const count = totalCount()

  return (
    <div className="flex-1 relative overflow-hidden" style={{ background: APP_GRADIENT }}>
      <AppHeader bg="#F7AE2B" badgeBorder="#ffffff" />

      <div
        className="absolute bg-white"
        style={{
          top: 45,
          left: 0,
          width: 375,
          height: 100,
          boxShadow: '0px 4px 3px rgba(0,0,0,0.1), 0px 2px 2px rgba(0,0,0,0.1)',
        }}
      />

      <h1
        className="absolute z-10 uppercase text-[#2e4858] whitespace-pre"
        style={{
          left: 9,
          top: 60,
          fontSize: 30,
          lineHeight: '36px',
          letterSpacing: '0.01em',
          fontFamily: '"Showcard Gothic", "Alfa Slab One", serif',
        }}
      >
        {' Ugingo Shop'}
      </h1>

      <p
        className="absolute z-10 font-inter font-normal text-[#4a5565] whitespace-nowrap"
        style={{ left: 15, top: 102.8, fontSize: 14, lineHeight: '20px' }}
      >
        Learn and play with Ugingo!
      </p>

      <Link
        to="/cart"
        aria-label={`Cart with ${count} items`}
        className="absolute z-10 bg-[#95989a] flex items-center gap-2 rounded-full active:scale-95 transition-transform"
        style={{
          left: 284,
          top: 69,
          width: 77.075,
          height: 44,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 12,
          paddingBottom: 12,
          filter: 'drop-shadow(0px 10px 7.5px rgba(0,0,0,0.1)) drop-shadow(0px 4px 3px rgba(0,0,0,0.1))',
        }}
      >
        <img src={cartIconUrl} alt="" aria-hidden draggable={false} className="block" style={{ width: 20, height: 20 }} />
        <span className="font-inter font-normal text-white whitespace-nowrap" style={{ fontSize: 14, lineHeight: '20px' }}>
          ({count})
        </span>
      </Link>

      <div
        className="absolute overflow-y-auto overflow-x-clip scrollbar-hover"
        style={{ top: 143, left: 0, width: 375, height: 669 }}
      >
        <div className="relative" style={{ width: 375, height: 1880 }}>
          <div
            className="absolute bg-white overflow-hidden flex flex-col"
            style={{
              top: 22,
              left: 24,
              width: 326.8,
              height: 434,
              borderRadius: 24,
              boxShadow:
                '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
            }}
          >
            <div
              className="relative shrink-0"
              style={{ width: '100%', height: 224, background: HERO_GRADIENT }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ width: 326.8, height: 224 }}
              >
                <span style={{ fontSize: 72, lineHeight: '72px' }} aria-hidden>
                  🎴
                </span>
              </div>
              <div className="absolute inset-0 bg-[#3d3d3d]" style={{ width: 326.8, height: 224 }}>
                <p
                  className="absolute font-inter font-semibold"
                  style={{
                    left: 79,
                    top: 112,
                    width: 195,
                    height: 44,
                    fontSize: 24,
                    lineHeight: '28px',
                    color: 'rgba(149,152,154,0.74)',
                  }}
                >
                  Coming Soon!
                </p>
              </div>
            </div>

            <div className="relative shrink-0" style={{ width: '100%', height: 210 }}>
              <h3
                className="absolute font-inter font-medium text-[#f8c83c] whitespace-nowrap"
                style={{ left: 20, top: 18.8, fontSize: 20, lineHeight: '28px' }}
              >
                Adventures of Ugingo
              </h3>
              <p
                className="absolute font-inter font-normal text-[#95989a]"
                style={{ left: 20, top: 41, width: 287, fontSize: 14, lineHeight: '20px' }}
              >
                Join Ugingo on exciting adventures while learning new words!
              </p>
              <div
                className="absolute flex items-center justify-between"
                style={{ left: 20, top: 142, width: 286.8, height: 48 }}
              >
                <span
                  className="font-inter font-normal text-[#95989a] whitespace-nowrap"
                  style={{ fontSize: 15, lineHeight: '32px' }}
                >
                  UGX 5,000
                </span>
                <button
                  type="button"
                  disabled
                  className="bg-[#dadde2] rounded-full text-[#95989a] font-inter font-medium cursor-not-allowed"
                  style={{ width: 99, height: 26, fontSize: 12, lineHeight: '24px' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {COMING_SOON.map((p) => (
            <div
              key={p.title}
              className="absolute bg-white overflow-hidden flex flex-col"
              style={{
                top: p.y,
                left: p.leftCard,
                width: 326.8,
                height: 384,
                borderRadius: 24,
                opacity: 0.75,
                boxShadow:
                  '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)',
              }}
            >
              <div
                className="relative shrink-0"
                style={{ width: '100%', height: 224, background: HERO_GRADIENT }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ width: 326.8, height: 224 }}
                >
                  <span style={{ fontSize: 72, lineHeight: '72px' }} aria-hidden>
                    {p.emoji}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black" style={{ width: 326.8, height: 224 }}>
                  {p.plain ? (
                    <p
                      className="absolute font-inter font-semibold"
                      style={{
                        left: 79,
                        top: 120,
                        width: 195,
                        height: 44,
                        fontSize: 24,
                        lineHeight: '28px',
                        color: 'rgba(149,152,154,0.74)',
                      }}
                    >
                      Coming Soon!
                    </p>
                  ) : (
                    <div
                      className="absolute flex items-center justify-center"
                      style={{ left: 79.25, top: 69.83, width: 168.293, height: 84.337 }}
                    >
                      <div style={{ transform: 'rotate(-12deg)' }}>
                        <div
                          className="relative bg-[rgba(249,180,56,0.2)] rounded-full"
                          style={{
                            width: 161,
                            height: 52,
                            boxShadow:
                              '0px 10px 15px 0px rgba(0,0,0,0.1), 0px 4px 6px 0px rgba(0,0,0,0.1)',
                          }}
                        >
                          <p
                            className="absolute font-inter font-normal text-[#ff5300] whitespace-nowrap"
                            style={{ left: 23.88, top: 10.6, fontSize: 18, lineHeight: '28px' }}
                          >
                            Coming Soon!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative shrink-0" style={{ width: '100%', height: 160 }}>
                <h3
                  className="absolute font-inter font-medium text-[#f16522] whitespace-nowrap"
                  style={{ left: 20, top: 18.8, fontSize: 20, lineHeight: '28px' }}
                >
                  {p.title}
                </h3>
                <p
                  className="absolute font-inter font-normal text-[#4a5565] whitespace-nowrap"
                  style={{ left: 20, top: 55.8, fontSize: 14, lineHeight: '20px' }}
                >
                  {p.desc}
                </p>
                <div
                  className="absolute flex items-center justify-between"
                  style={{ left: 20, top: 92, width: 286.8, height: 48 }}
                >
                  <span
                    className="font-inter font-normal text-[#2e4858] whitespace-nowrap"
                    style={{ fontSize: 24, lineHeight: '32px' }}
                  >
                    {p.price}
                  </span>
                  <button
                    type="button"
                    disabled
                    className="bg-[#d1d5dc] rounded-full text-[#6a7282] font-inter font-medium cursor-not-allowed"
                    style={{ width: 146.375, height: 48, fontSize: 16, lineHeight: '24px' }}
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div
            className="absolute"
            style={{
              top: 1692,
              left: 27,
              width: 326.8,
              height: 167.975,
              borderRadius: 24,
              background: FOOTER_GRADIENT,
              paddingTop: 24,
              paddingLeft: 24,
              paddingRight: 24,
              filter: 'drop-shadow(0px 25px 25px rgba(0,0,0,0.25))',
            }}
          >
            <p
              className="absolute font-inter font-medium text-white text-center"
              style={{
                left: 24 + 139.5,
                top: 24 - 2,
                width: 279,
                transform: 'translateX(-50%)',
                fontSize: 24,
                lineHeight: '32px',
              }}
            >
              🎉 More Fun Items Coming Soon!
            </p>
            <p
              className="absolute font-inter font-normal text-white text-center opacity-90"
              style={{
                left: 24 + 139.5,
                top: 24 + 63.975 + 8 - 2.2,
                width: 279,
                transform: 'translateX(-50%)',
                fontSize: 16,
                lineHeight: '24px',
              }}
            >
              Stay tuned for exciting new learning materials and Ugingo merchandise!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
