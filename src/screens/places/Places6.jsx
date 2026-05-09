import PlacesQuizShell from '../../components/places/PlacesQuizShell'

export default function Places6() {
  return (
    <PlacesQuizShell
      question="What is Ennyanja?"
      questionStyle={{ top: 389, left: 83, width: 210 }}
      options={['Mountain', 'Lake', 'Road']}
      correctIndex={1}
      nextPath="/places/7"
    />
  )
}
