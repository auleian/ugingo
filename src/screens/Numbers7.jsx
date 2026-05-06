import NumbersQuizShell from '../components/NumbersQuizShell'

export default function Numbers7() {
  return (
    <NumbersQuizShell
      question="What is 11 in Luganda"
      options={['Kkumi ne emu', 'Emu na kkumi', 'Abiri']}
      correctIndex={0}
      nextPath="/numbers/8"
      failPath="/numbers/10"
    />
  )
}
