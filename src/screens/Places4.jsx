import PlacesQuizShell from '../components/PlacesQuizShell'

export default function Places4() {
  return (
    <PlacesQuizShell
      question="Where do you go to buy fresh food?"
      questionStyle={{ top: 374, left: 36, width: 306 }}
      options={['Akatale', 'Eddwaliro', 'Essomero']}
      correctIndex={0}
      nextPath="/places/5"
    />
  )
}
