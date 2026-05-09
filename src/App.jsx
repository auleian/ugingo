import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import MobileFrame from './layouts/MobileFrame'
import { preloadAllImages } from './lib/preloadImages'
import { startPreload as startMusicPreload } from './lib/lessonsMusic'
import { playCorrect } from './lib/sound'
import Welcome from './screens/onboarding/Welcome'
import WelcomeBranded from './screens/onboarding/WelcomeBranded'
import Gingo from './screens/onboarding/Gingo'
import Plan from './screens/onboarding/Plan'
import Languages from './screens/onboarding/Languages'
import Question from './screens/onboarding/Question'
import CreatingPlan from './screens/onboarding/CreatingPlan'
import Ready from './screens/onboarding/Ready'
import Home from './screens/Home'
import CulturePlan from './screens/onboarding/CulturePlan'
import LanguagePlanIntro from './screens/onboarding/LanguagePlanIntro'
import LanguagePlanStart from './screens/onboarding/LanguagePlanStart'
import LessonMap from './screens/LessonMap'
import Placeholder from './screens/Placeholder'
import NumbersMain from './screens/numbers/NumbersMain'
import Numbers1 from './screens/numbers/Numbers1'
import Numbers2 from './screens/numbers/Numbers2'
import Numbers3 from './screens/numbers/Numbers3'
import Numbers4 from './screens/numbers/Numbers4'
import Numbers5 from './screens/numbers/Numbers5'
import Numbers6 from './screens/numbers/Numbers6'
import Numbers7 from './screens/numbers/Numbers7'
import Numbers8 from './screens/numbers/Numbers8'
import Numbers9 from './screens/numbers/Numbers9'
import Numbers10 from './screens/numbers/Numbers10'
import Numbers11 from './screens/numbers/Numbers11'
import Alphabet1 from './screens/alphabet/Alphabet1'
import Alphabet2 from './screens/alphabet/Alphabet2'
import Alphabet3 from './screens/alphabet/Alphabet3'
import Alphabet4 from './screens/alphabet/Alphabet4'
import Alphabet5 from './screens/alphabet/Alphabet5'
import Alphabet6 from './screens/alphabet/Alphabet6'
import Alphabet7 from './screens/alphabet/Alphabet7'
import Alphabet8 from './screens/alphabet/Alphabet8'
import Alphabet9 from './screens/alphabet/Alphabet9'
import Alphabet10 from './screens/alphabet/Alphabet10'
import Alphabet11 from './screens/alphabet/Alphabet11'
import Alphabet12 from './screens/alphabet/Alphabet12'
import AlphabetTryAgain from './screens/alphabet/AlphabetTryAgain'
import PeopleMain from './screens/people/PeopleMain'
import People1 from './screens/people/People1'
import People2 from './screens/people/People2'
import People3 from './screens/people/People3'
import People4 from './screens/people/People4'
import People5 from './screens/people/People5'
import People6 from './screens/people/People6'
import People7 from './screens/people/People7'
import People8 from './screens/people/People8'
import People9 from './screens/people/People9'
import PeopleTryAgain from './screens/people/PeopleTryAgain'
import AnimalsMain from './screens/animals/AnimalsMain'
import Animals1 from './screens/animals/Animals1'
import Animals2 from './screens/animals/Animals2'
import Animals3 from './screens/animals/Animals3'
import Animals4 from './screens/animals/Animals4'
import Animals5 from './screens/animals/Animals5'
import Animals6 from './screens/animals/Animals6'
import Animals7 from './screens/animals/Animals7'
import Animals8 from './screens/animals/Animals8'
import AnimalsTryAgain from './screens/animals/AnimalsTryAgain'
import PlacesMain from './screens/places/PlacesMain'
import Places1 from './screens/places/Places1'
import Places2 from './screens/places/Places2'
import Places3 from './screens/places/Places3'
import Places4 from './screens/places/Places4'
import Places5 from './screens/places/Places5'
import Places6 from './screens/places/Places6'
import Places7 from './screens/places/Places7'
import PlacesTryAgain from './screens/places/PlacesTryAgain'
import Profile from './screens/Profile'
import Shop from './screens/Shop'
import Cart from './screens/Cart'

// Routes that aren't lesson content — onboarding flow up to (but not
// including) the lessons map. The chime fires on any button/link clicked on
// these screens, except inside the AppHeader.
const POST_LESSONS_PREFIXES = [
  '/lessons',
  '/numbers',
  '/alphabet',
  '/people',
  '/animals',
  '/places',
  '/profile',
  '/shop',
  '/cart',
]
function isPreLessons(pathname) {
  return !POST_LESSONS_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'))
}

function PreLessonsChime() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!isPreLessons(pathname)) return
    const handler = (e) => {
      const t = e.target
      if (!t || !t.closest) return
      // Skip clicks inside an AppHeader (its outer element is <header>).
      if (t.closest('header')) return
      // Only chime on interactive elements.
      if (!t.closest('button, a, [role="button"]')) return
      playCorrect()
    }
    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [pathname])
  return null
}

export default function App() {
  useEffect(() => {
    preloadAllImages()
    // Kick off lessons-music download right after first paint so by the time
    // the user reaches a lesson screen, the 5s-buffer gate resolves instantly.
    startMusicPreload()
  }, [])

  return (
    <MobileFrame>
      <PreLessonsChime />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<WelcomeBranded />} />
        <Route path="/gingo" element={<Gingo />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/question/:num" element={<Question />} />
        <Route path="/creating-plan" element={<CreatingPlan />} />
        <Route path="/ready" element={<Ready />} />
        <Route path="/home" element={<Home />} />
        <Route path="/language-plan" element={<LanguagePlanIntro />} />
        <Route path="/language-plan/start" element={<LanguagePlanStart />} />
        <Route path="/lessons" element={<LessonMap />} />
        <Route path="/numbers" element={<NumbersMain />} />
        <Route path="/numbers/1" element={<Numbers1 />} />
        <Route path="/numbers/2" element={<Numbers2 />} />
        <Route path="/numbers/3" element={<Numbers3 />} />
        <Route path="/numbers/4" element={<Numbers4 />} />
        <Route path="/numbers/5" element={<Numbers5 />} />
        <Route path="/numbers/6" element={<Numbers6 />} />
        <Route path="/numbers/7" element={<Numbers7 />} />
        <Route path="/numbers/8" element={<Numbers8 />} />
        <Route path="/numbers/9" element={<Numbers9 />} />
        <Route path="/numbers/10" element={<Numbers10 />} />
        <Route path="/numbers/11" element={<Numbers11 />} />
        <Route path="/alphabet/1" element={<Alphabet1 />} />
        <Route path="/alphabet/2" element={<Alphabet2 />} />
        <Route path="/alphabet/3" element={<Alphabet3 />} />
        <Route path="/alphabet/4" element={<Alphabet4 />} />
        <Route path="/alphabet/5" element={<Alphabet5 />} />
        <Route path="/alphabet/6" element={<Alphabet6 />} />
        <Route path="/alphabet/7" element={<Alphabet7 />} />
        <Route path="/alphabet/8" element={<Alphabet8 />} />
        <Route path="/alphabet/9" element={<Alphabet9 />} />
        <Route path="/alphabet/10" element={<Alphabet10 />} />
        <Route path="/alphabet/11" element={<Alphabet11 />} />
        <Route path="/alphabet/12" element={<Alphabet12 />} />
        <Route path="/alphabet/try-again" element={<AlphabetTryAgain />} />
        <Route path="/people" element={<PeopleMain />} />
        <Route path="/people/1" element={<People1 />} />
        <Route path="/people/2" element={<People2 />} />
        <Route path="/people/3" element={<People3 />} />
        <Route path="/people/4" element={<People4 />} />
        <Route path="/people/5" element={<People5 />} />
        <Route path="/people/6" element={<People6 />} />
        <Route path="/people/7" element={<People7 />} />
        <Route path="/people/8" element={<People8 />} />
        <Route path="/people/9" element={<People9 />} />
        <Route path="/people/try-again" element={<PeopleTryAgain />} />
        <Route path="/animals" element={<AnimalsMain />} />
        <Route path="/animals/1" element={<Animals1 />} />
        <Route path="/animals/2" element={<Animals2 />} />
        <Route path="/animals/3" element={<Animals3 />} />
        <Route path="/animals/4" element={<Animals4 />} />
        <Route path="/animals/5" element={<Animals5 />} />
        <Route path="/animals/6" element={<Animals6 />} />
        <Route path="/animals/7" element={<Animals7 />} />
        <Route path="/animals/8" element={<Animals8 />} />
        <Route path="/animals/try-again" element={<AnimalsTryAgain />} />
        <Route path="/places" element={<PlacesMain />} />
        <Route path="/places/1" element={<Places1 />} />
        <Route path="/places/2" element={<Places2 />} />
        <Route path="/places/3" element={<Places3 />} />
        <Route path="/places/4" element={<Places4 />} />
        <Route path="/places/5" element={<Places5 />} />
        <Route path="/places/6" element={<Places6 />} />
        <Route path="/places/7" element={<Places7 />} />
        <Route path="/places/try-again" element={<PlacesTryAgain />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/culture-plan" element={<CulturePlan />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MobileFrame>
  )
}
