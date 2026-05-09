import PeopleQuizShell from '../../components/people/PeopleQuizShell'

export default function People7() {
  return (
    <PeopleQuizShell
      question="How do you say sir respectfully?"
      options={['Ssebo', 'Nnyabo', 'Gwe']}
      correctIndex={0}
      nextPath="/people/8"
    />
  )
}
