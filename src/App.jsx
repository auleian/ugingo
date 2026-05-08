import { Routes, Route, Navigate } from 'react-router-dom'
import MobileFrame from './layouts/MobileFrame'
import Welcome from './screens/Welcome'
import WelcomeBranded from './screens/WelcomeBranded'
import Gingo from './screens/Gingo'
import Plan from './screens/Plan'
import Languages from './screens/Languages'
import Question from './screens/Question'
import CreatingPlan from './screens/CreatingPlan'
import Ready from './screens/Ready'
import Home from './screens/Home'
import CulturePlan from './screens/CulturePlan'
import LanguagePlanIntro from './screens/LanguagePlanIntro'
import LanguagePlanStart from './screens/LanguagePlanStart'
import LessonMap from './screens/LessonMap'
import Placeholder from './screens/Placeholder'
import NumbersMain from './screens/NumbersMain'
import Numbers1 from './screens/Numbers1'
import Numbers2 from './screens/Numbers2'
import Numbers3 from './screens/Numbers3'
import Numbers4 from './screens/Numbers4'
import Numbers5 from './screens/Numbers5'
import Numbers6 from './screens/Numbers6'
import Numbers7 from './screens/Numbers7'
import Numbers8 from './screens/Numbers8'
import Numbers9 from './screens/Numbers9'
import Numbers10 from './screens/Numbers10'
import Numbers11 from './screens/Numbers11'
import Alphabet1 from './screens/Alphabet1'
import Alphabet2 from './screens/Alphabet2'
import Alphabet3 from './screens/Alphabet3'
import Alphabet4 from './screens/Alphabet4'
import Alphabet5 from './screens/Alphabet5'
import Alphabet6 from './screens/Alphabet6'
import Alphabet7 from './screens/Alphabet7'
import Alphabet8 from './screens/Alphabet8'
import Alphabet9 from './screens/Alphabet9'
import Alphabet10 from './screens/Alphabet10'
import Alphabet11 from './screens/Alphabet11'
import Alphabet12 from './screens/Alphabet12'
import AlphabetTryAgain from './screens/AlphabetTryAgain'
import PeopleMain from './screens/PeopleMain'
import People1 from './screens/People1'
import People2 from './screens/People2'
import People3 from './screens/People3'
import People4 from './screens/People4'
import People5 from './screens/People5'
import People6 from './screens/People6'
import People7 from './screens/People7'
import People8 from './screens/People8'
import People9 from './screens/People9'
import PeopleTryAgain from './screens/PeopleTryAgain'
import AnimalsMain from './screens/AnimalsMain'
import Animals1 from './screens/Animals1'
import Animals2 from './screens/Animals2'
import Animals3 from './screens/Animals3'
import Animals4 from './screens/Animals4'
import Animals5 from './screens/Animals5'
import Animals6 from './screens/Animals6'
import Animals7 from './screens/Animals7'
import Animals8 from './screens/Animals8'
import AnimalsTryAgain from './screens/AnimalsTryAgain'
import PlacesMain from './screens/PlacesMain'
import Places1 from './screens/Places1'
import Places2 from './screens/Places2'
import Places3 from './screens/Places3'
import Places4 from './screens/Places4'
import Places5 from './screens/Places5'
import Places6 from './screens/Places6'
import Places7 from './screens/Places7'
import PlacesTryAgain from './screens/PlacesTryAgain'
import Profile from './screens/Profile'
import Shop from './screens/Shop'
import Cart from './screens/Cart'

export default function App() {
  return (
    <MobileFrame>
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
