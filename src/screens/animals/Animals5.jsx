import AnimalsQuizShell from '../../components/animals/AnimalsQuizShell'

export default function Animals5() {
  return (
    <AnimalsQuizShell
      question="Translate Ente to English"
      options={['Cow', 'Goat', 'Chicken']}
      correctIndex={0}
      nextPath="/animals/6"
      failPath="/animals/try-again"
      questionStyle={{ top: 255, left: 31, width: 312, fontSize: 24 }}
    />
  )
}
