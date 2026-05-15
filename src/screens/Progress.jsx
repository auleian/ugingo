import AccountBackHeader from '../components/AccountBackHeader'
import chartImg from '../assets/emojis/chart.png'
import booksImg from '../assets/emojis/books.png'
import checkImg from '../assets/emojis/check.png'
import fireImg from '../assets/emojis/fire.png'
import starGlowImg from '../assets/emojis/star-glow.png'
import partyImg from '../assets/emojis/party.png'

// Design placeholders — later this will read from a user-stats store fed by
// the lesson engine (words encountered, lessons completed, streak counter).
const DEFAULT_STATS = {
  wordsLearned: 10,
  wordsGoal: 30, // unknown in Figma — picked so 10/30 ≈ the rendered ~33% fill
  lessonsDone: 2,
  lessonsGoal: 5, // 2/5 ≈ rendered ~45% fill
  dayStreak: 7,
  weekDays: 7, // streak bar shows 7 segments (Mon–Sun)
  completedDays: 7, // all 7 currently completed in the design
}

// Stat card with gradient bg, emoji-image tile, title/subtitle, big number,
// and a horizontal progress bar at the bottom — Figma 879:529 / 879:543.
function StatCard({ top, left, gradient, iconSrc, title, subtitle, value, progress }) {
  // progress 0..1 — fill width is (progress * trackWidth)
  return (
    <div
      className="absolute rounded-[16px] overflow-hidden flex flex-col"
      style={{
        top,
        left,
        width: 278.8,
        height: 104,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        gap: 12,
        backgroundImage: gradient,
        filter: 'drop-shadow(0 4px 3px rgba(0,0,0,0.1)) drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
      }}
    >
      {/* Top row: icon tile + text block + big value, justified */}
      <div className="flex items-center justify-between" style={{ height: 48 }}>
        <div className="flex items-center" style={{ gap: 12 }}>
          {/* 48×48 white/30% tile holding the emoji image */}
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              backgroundColor: 'rgba(255,255,255,0.3)',
            }}
          >
            <img src={iconSrc} alt="" aria-hidden draggable={false} style={{ width: 28, height: 28 }} />
          </div>
          <div className="flex flex-col">
            <p
              className="font-inter font-black text-white whitespace-nowrap"
              style={{ fontSize: 16, lineHeight: '24px' }}
            >
              {title}
            </p>
            <p
              className="font-inter"
              style={{ fontSize: 12, lineHeight: '16px', color: 'rgba(255,255,255,0.8)' }}
            >
              {subtitle}
            </p>
          </div>
        </div>
        <p
          className="font-inter font-black text-white whitespace-nowrap"
          style={{ fontSize: 30, lineHeight: '36px' }}
        >
          {value}
        </p>
      </div>
      {/* Progress bar — track + fill */}
      <div
        className="rounded-full overflow-hidden"
        style={{ height: 12, backgroundColor: 'rgba(255,255,255,0.2)' }}
      >
        <div
          className="rounded-full bg-white transition-[width] duration-300 ease-out"
          style={{ height: 12, width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
        />
      </div>
    </div>
  )
}

// Streak card with 7 day-segments instead of a single progress bar — Figma 879:557
function StreakCard({ top, left, value, weekDays, completedDays }) {
  return (
    <div
      className="absolute rounded-[16px] overflow-hidden flex flex-col"
      style={{
        top,
        left,
        width: 278.8,
        height: 104,
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        gap: 12,
        backgroundColor: '#95989A',
        filter: 'drop-shadow(0 4px 3px rgba(0,0,0,0.1)) drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
      }}
    >
      <div className="flex items-center justify-between" style={{ height: 48 }}>
        <div className="flex items-center" style={{ gap: 12 }}>
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              backgroundColor: 'rgba(255,255,255,0.3)',
            }}
          >
            <img src={fireImg} alt="" aria-hidden draggable={false} style={{ width: 28, height: 28 }} />
          </div>
          <div className="flex flex-col">
            <p
              className="font-inter font-black text-white whitespace-nowrap"
              style={{ fontSize: 16, lineHeight: '24px' }}
            >
              Day Streak
            </p>
            <p
              className="font-inter"
              style={{ fontSize: 12, lineHeight: '16px', color: 'rgba(255,255,255,0.8)' }}
            >
              Don&apos;t stop!
            </p>
          </div>
        </div>
        <p
          className="font-inter font-black text-white whitespace-nowrap"
          style={{ fontSize: 30, lineHeight: '36px' }}
        >
          {value}
        </p>
      </div>
      {/* 7 equal segments (Mon..Sun); completed ones get full-white, others 30% */}
      <div className="flex" style={{ gap: 4, height: 12 }}>
        {Array.from({ length: weekDays }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-[4px] transition-colors"
            style={{
              height: 12,
              backgroundColor:
                i < completedDays ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Progress({ stats = DEFAULT_STATS }) {
  const {
    wordsLearned,
    wordsGoal,
    lessonsDone,
    lessonsGoal,
    dayStreak,
    weekDays,
    completedDays,
  } = stats

  return (
    <div className="flex-1 relative overflow-hidden bg-white">

      <AccountBackHeader to="/my-account" label="Back" ariaLabel="Back to My Account" />

      {/* Light cyan tint below the header — stretches full viewport */}
      <div
        className="absolute pointer-events-none"
        style={{ top: 287, left: 0, right: 0, height: 525, backgroundColor: '#DEFCFF' }}
      />

      {/* 374-wide centered content frame */}
      <div className="relative w-[374px] max-w-full h-full mx-auto">

      {/* Header section — Figma 879:524 (278.8×116 at left=47 top=160) */}
      <div className="absolute" style={{ top: 160, left: 47, width: 278.8 }}>
        {/* 📊 emoji centered */}
        <div className="absolute -translate-x-1/2 flex items-center justify-center" style={{ left: 139.44, top: -3, width: 48, height: 48 }}>
          <img src={chartImg} alt="" aria-hidden draggable={false} style={{ width: 44, height: 44 }} />
        </div>
        {/* "Your Progress!" — Inter Black 24 #1E2939 */}
        <p
          className="absolute -translate-x-1/2 text-center font-inter font-black whitespace-nowrap"
          style={{
            left: 139.4,
            top: 60,
            color: '#1E2939',
            fontSize: 24,
            lineHeight: '32px',
          }}
        >
          Your Progress!
        </p>
        {/* "Look how much you've learned!" — Inter 14 #4A5565 */}
        <p
          className="absolute -translate-x-1/2 text-center font-inter whitespace-nowrap"
          style={{
            left: 139.77,
            top: 95.79,
            color: '#4A5565',
            fontSize: 14,
            lineHeight: '20px',
          }}
        >
          Look how much you&apos;ve learned!
        </p>
      </div>

      {/* Words Learned — Figma 879:529 (blue→cyan gradient at top=300 left=49) */}
      <StatCard
        top={300}
        left={49}
        gradient="linear-gradient(159.543deg, #51A2FF 0%, #00B8DB 100%)"
        iconSrc={booksImg}
        title="Words Learned"
        subtitle="Keep going!"
        value={wordsLearned}
        progress={wordsGoal > 0 ? wordsLearned / wordsGoal : 0}
      />

      {/* Lessons Done — Figma 879:543 (green gradient at top=416 left=50) */}
      <StatCard
        top={416}
        left={50}
        gradient="linear-gradient(159.543deg, #05DF72 0%, #00BC7D 100%)"
        iconSrc={checkImg}
        title="Lessons Done"
        subtitle="Amazing!"
        value={lessonsDone}
        progress={lessonsGoal > 0 ? lessonsDone / lessonsGoal : 0}
      />

      {/* Day Streak — Figma 879:557 (gray solid at top=532 left=50, 7 segments) */}
      <StreakCard
        top={532}
        left={50}
        value={dayStreak}
        weekDays={weekDays}
        completedDays={completedDays}
      />

      {/* AMAZING celebration card — Figma 879:577 (yellow→orange gradient at top=677 left=49) */}
      <div
        className="absolute rounded-[16px] overflow-hidden flex flex-col"
        style={{
          top: 677,
          left: 49,
          width: 278.8,
          height: 116,
          paddingTop: 16,
          paddingLeft: 16,
          paddingRight: 16,
          gap: 8,
          backgroundImage: 'linear-gradient(to right, #FDC700 0%, #FF6900 100%)',
          filter: 'drop-shadow(0 4px 3px rgba(0,0,0,0.1)) drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
        }}
      >
        <div className="flex items-center justify-center" style={{ gap: 12, height: 56 }}>
          <img src={starGlowImg} alt="" aria-hidden draggable={false} style={{ width: 36, height: 36 }} />
          <p
            className="text-center font-inter font-black text-white"
            style={{ width: 141, fontSize: 18, lineHeight: '28px' }}
          >
            You&apos;re doing AMAZING!
          </p>
          <img src={partyImg} alt="" aria-hidden draggable={false} style={{ width: 36, height: 36 }} />
        </div>
        <p
          className="text-center font-inter whitespace-nowrap"
          style={{ fontSize: 14, lineHeight: '20px', color: 'rgba(255,255,255,0.9)' }}
        >
          Keep learning Ugandan languages!
        </p>
      </div>

      </div>
    </div>
  )
}
