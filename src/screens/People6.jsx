import PeopleQuizShell from '../components/PeopleQuizShell'

export default function People6() {
  return (
    <PeopleQuizShell
      question="What does Jjajja mean?"
      options={['Father', 'Baby', 'Grandparent']}
      correctIndex={2}
      nextPath="/people/7"
    />
  )
}
