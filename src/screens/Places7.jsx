import PlacesQuizShell from '../components/PlacesQuizShell'

export default function Places7() {
  return (
    <PlacesQuizShell
      question="How do you say Home?"
      questionStyle={{ top: 382, left: 67, width: 242 }}
      options={['Awaka', 'Ekyalo', 'Banka']}
      correctIndex={0}
      nextPath="/lessons"
    />
  )
}
