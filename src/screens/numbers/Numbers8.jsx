import NumbersQuizShell from '../../components/numbers/NumbersQuizShell'

export default function Numbers8() {
  return (
    <NumbersQuizShell
      question="Translate &lsquo;Abiri&rsquo;"
      options={['2', '12', '20']}
      correctIndex={2}
      nextPath="/numbers/9"
      failPath="/numbers/10"
    />
  )
}
