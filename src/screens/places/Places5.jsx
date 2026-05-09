import PlacesQuizShell from '../../components/places/PlacesQuizShell'

export default function Places5() {
  return (
    <PlacesQuizShell
      question="Translate Essomero"
      questionStyle={{ top: 389, left: 83, width: 210 }}
      options={['Shop', 'School', 'Home']}
      correctIndex={1}
      nextPath="/places/6"
    />
  )
}
