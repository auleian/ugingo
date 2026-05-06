import AnimalsQuizShell from '../components/AnimalsQuizShell'

export default function Animals7() {
  return (
    <AnimalsQuizShell
      question="How do you say Dog?"
      options={['Kkapa', 'Embuzi', 'Embwa']}
      correctIndex={2}
      nextPath="/animals/8"
      failPath="/animals/try-again"
    />
  )
}
