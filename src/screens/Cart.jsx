import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import shopAdventures from '../assets/shop-adventures.jpg'
import cartHeaderIcon from '../assets/cart-header-icon.svg'
import cartMinusIcon from '../assets/cart-minus.svg'
import cartPlusIcon from '../assets/cart-plus.svg'
import cartCheckoutCard from '../assets/cart-checkout-card.svg'
import { addOne, removeItem, setQty, totalCount, useCart } from '../lib/cart'

const THUMB_GRADIENT = 'linear-gradient(135deg, rgb(190, 219, 255) 0%, rgb(233, 212, 255) 100%)'
const CHECKOUT_GRADIENT = 'linear-gradient(to right, #ad46ff, #f6339a)'

const ADVENTURES_ID = 'adventures-of-ugingo'
const ADVENTURES_PRICE = 5000

function CloseXIcon({ stroke = 'white', strokeWidth = 2 }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6 L6 18" />
      <path d="M6 6 L18 18" />
    </svg>
  )
}

function RemoveXIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FB2C36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6 L6 18" />
      <path d="M6 6 L18 18" />
    </svg>
  )
}

export default function Cart() {
  const navigate = useNavigate()
  const cart = useCart()
  const adventuresQty = cart[ADVENTURES_ID] || 0
  const subtotal = adventuresQty * ADVENTURES_PRICE
  const isEmpty = totalCount() === 0

  const formatUgx = (n) => `UGX ${n.toLocaleString('en-US')}`

  return (
    <div className="flex-1 relative overflow-hidden bg-white">
      <AppHeader />

      <div
        className="absolute bg-[#2e4858] flex items-center justify-between"
        style={{ top: 45, left: 0, width: 375, height: 78, paddingLeft: 20, paddingRight: 20 }}
      >
        <div className="relative shrink-0" style={{ width: 114.35, height: 28 }}>
          <img
            src={cartHeaderIcon}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute block"
            style={{ left: 0, top: 3, width: 22, height: 22 }}
          />
          <p
            className="absolute font-inter font-medium text-white whitespace-nowrap"
            style={{ left: 30, top: -1.2, fontSize: 20, lineHeight: '28px' }}
          >
            Your Cart
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/shop')}
          aria-label="Close cart"
          className="relative shrink-0 rounded-full active:scale-95 transition flex items-center justify-center"
          style={{ width: 38, height: 38 }}
        >
          <CloseXIcon stroke="white" strokeWidth={2} />
        </button>
      </div>

      <div
        className="absolute overflow-hidden"
        style={{ top: 165, left: 0, width: 375, height: 356, paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}
      >
        {isEmpty ? (
          <div
            className="bg-[#faf5ff] flex flex-col items-center justify-center text-center"
            style={{ width: '100%', height: 220, padding: 24, borderRadius: 16 }}
          >
            <p
              className="font-inter font-medium text-[#2e4858]"
              style={{ fontSize: 18, lineHeight: '28px' }}
            >
              Your cart is empty
            </p>
            <p
              className="mt-2 font-inter font-normal text-[#4a5565]"
              style={{ fontSize: 14, lineHeight: '20px' }}
            >
              Tap "Add to Cart" on a product to get started.
            </p>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="mt-4 bg-[#f16522] text-white rounded-full font-inter font-medium active:scale-95 transition-transform"
              style={{ paddingLeft: 20, paddingRight: 20, height: 40, fontSize: 14, lineHeight: '20px' }}
            >
              Browse Shop
            </button>
          </div>
        ) : (
          adventuresQty > 0 && (
            <div
              className="bg-[#faf5ff] flex items-start relative"
              style={{ width: '100%', height: 120, padding: 16, gap: 12, borderRadius: 16 }}
            >
              <div
                className="overflow-hidden shrink-0 relative"
                style={{ width: 80, height: 80, background: THUMB_GRADIENT, borderRadius: 14 }}
              >
                <img
                  src={shopAdventures}
                  alt=""
                  aria-hidden
                  draggable={false}
                  className="absolute inset-0 max-w-none w-full h-full object-cover pointer-events-none select-none"
                />
              </div>

              <div className="relative shrink-0" style={{ width: 210, height: 88 }}>
                <h3
                  className="absolute font-inter font-medium text-[#2e4858] whitespace-nowrap"
                  style={{ left: 0, top: -2.2, fontSize: 16, lineHeight: '24px' }}
                >
                  Adventures of Ugingo
                </h3>
                <p
                  className="absolute font-inter font-normal text-[#f7ae2b] whitespace-nowrap"
                  style={{ left: 0, top: 27.8, fontSize: 14, lineHeight: '20px' }}
                >
                  {formatUgx(ADVENTURES_PRICE)}
                </p>
                <div className="absolute" style={{ left: 0, top: 56, width: 210, height: 32 }}>
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty(ADVENTURES_ID, adventuresQty - 1)}
                    className="absolute bg-[#f16522] rounded-full flex items-center justify-center active:scale-95 transition-transform"
                    style={{ left: 0, top: 0, width: 32, height: 32 }}
                  >
                    <img src={cartMinusIcon} alt="" aria-hidden draggable={false} className="block" style={{ width: 16, height: 16 }} />
                  </button>
                  <div className="absolute" style={{ left: 40, top: 4, width: 32, height: 24 }}>
                    <p
                      className="absolute font-inter font-normal text-[#0a0a0a] text-center whitespace-nowrap"
                      style={{ left: '50%', transform: 'translateX(-50%)', top: -2.2, fontSize: 16, lineHeight: '24px' }}
                    >
                      {adventuresQty}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => addOne(ADVENTURES_ID)}
                    className="absolute bg-[#f16522] rounded-full flex items-center justify-center active:scale-95 transition-transform"
                    style={{ left: 80, top: 0, width: 32, height: 32 }}
                  >
                    <img src={cartPlusIcon} alt="" aria-hidden draggable={false} className="block" style={{ width: 16, height: 16 }} />
                  </button>
                  <button
                    type="button"
                    aria-label="Remove from cart"
                    onClick={() => removeItem(ADVENTURES_ID)}
                    className="absolute flex items-center justify-center active:scale-95 transition"
                    style={{ left: 190, top: 6, width: 20, height: 20 }}
                  >
                    <RemoveXIcon />
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div
        className="absolute bg-[#f9fafb] flex flex-col"
        style={{
          top: 667,
          left: 1,
          width: 375,
          height: 144.788,
          paddingTop: 20.8,
          paddingLeft: 20,
          paddingRight: 20,
          gap: 16,
          borderTop: '0.8px solid #e5e7eb',
        }}
      >
        <div className="flex items-center justify-between relative shrink-0 w-full" style={{ height: 31.988 }}>
          <div className="relative shrink-0" style={{ width: 62.675, height: 24 }}>
            <p
              className="absolute font-inter font-normal text-[#4a5565] whitespace-nowrap"
              style={{ left: 0, top: -2.2, fontSize: 16, lineHeight: '24px' }}
            >
              Subtotal:
            </p>
          </div>
          <div className="relative shrink-0" style={{ width: 110.188, height: 31.988 }}>
            <p
              className="absolute font-inter font-normal text-[#f7ae2b] whitespace-nowrap"
              style={{ left: 0, top: 0, fontSize: 24, lineHeight: '32px' }}
            >
              {formatUgx(subtotal)}
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={isEmpty}
          className="relative shrink-0 rounded-full active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed"
          style={{
            width: 334,
            height: 56,
            background: CHECKOUT_GRADIENT,
            filter: 'drop-shadow(0px 10px 7.5px rgba(0,0,0,0.1)) drop-shadow(0px 4px 3px rgba(0,0,0,0.1))',
          }}
        >
          <div className="absolute" style={{ left: 0, top: 16, width: 334, height: 24 }}>
            <img
              src={cartCheckoutCard}
              alt=""
              aria-hidden
              draggable={false}
              className="absolute block"
              style={{ left: 117.96, top: 1, width: 22, height: 22 }}
            />
            <p
              className="absolute font-inter font-medium text-white text-center whitespace-nowrap"
              style={{ left: 181.96, top: -2.2, transform: 'translateX(-50%)', fontSize: 16, lineHeight: '24px' }}
            >
              Checkout
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}
