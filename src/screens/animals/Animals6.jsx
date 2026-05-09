import AnimalsQuizShell from '../../components/animals/AnimalsQuizShell'

export default function Animals6() {
  return (
    <AnimalsQuizShell
      question="Which animals live in water?"
      options={['Ebinyonyi', 'Ebyennyanja', 'Enkima']}
      correctIndex={1}
      nextPath="/animals/7"
      failPath="/animals/try-again"
    />
  )
}
