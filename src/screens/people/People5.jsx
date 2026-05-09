import PeopleQuizShell from '../../components/people/PeopleQuizShell'

export default function People5() {
  return (
    <PeopleQuizShell
      question="How do you say Woman in Luganda?"
      options={['Omusajja', 'Omukazi', 'Omwana']}
      correctIndex={1}
      nextPath="/people/6"
    />
  )
}
