import NumbersQuizShell from '../../components/numbers/NumbersQuizShell'

export default function Numbers6() {
  return (
    <NumbersQuizShell
      question="How do you say 10?"
      options={['Kumi', 'Kkumi', 'Kukumi']}
      correctIndex={1}
      nextPath="/numbers/7"
      failPath="/numbers/10"
    />
  )
}
