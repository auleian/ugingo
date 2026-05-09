import NumbersQuizShell from '../../components/numbers/NumbersQuizShell'

export default function Numbers5() {
  return (
    <NumbersQuizShell
      question="What is number 1?"
      options={['Emu', 'Bbiri', 'Satu']}
      correctIndex={0}
      nextPath="/numbers/6"
      failPath="/numbers/10"
    />
  )
}
