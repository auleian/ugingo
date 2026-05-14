import AnimalsQuizShell from '../../components/animals/AnimalsQuizShell'

export default function Animals7() {
  return (
    <AnimalsQuizShell
      question="How do you say Dog?"
      options={['Kkapa', 'Embuzi', 'Embwa']}
      correctIndex={2}
      nextPath="/animals/8"
      failPath="/animals/try-again"
      pillTextColor="#F16522"
    />
  )
}
