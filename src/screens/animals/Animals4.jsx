import AnimalsQuizShell from '../../components/animals/AnimalsQuizShell'

export default function Animals4() {
  return (
    <AnimalsQuizShell
      question="What is Empologoma?"
      options={['Cat', 'Lion', 'Dog']}
      correctIndex={1}
      nextPath="/animals/5"
      failPath="/animals/try-again"
      questionStyle={{ top: 291, left: 45, width: 284, fontSize: 24 }}
    />
  )
}
