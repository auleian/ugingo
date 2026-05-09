import PeopleQuizShell from '../../components/people/PeopleQuizShell'

export default function People8() {
  return (
    <PeopleQuizShell
      question="Translate Omwana"
      options={['Parent', 'Child', 'Friend']}
      correctIndex={1}
      nextPath="/people/9"
    />
  )
}
