import AlphabetQuizShell from '../../components/alphabet/AlphabetQuizShell'

export default function Alphabet9() {
  return (
    <AlphabetQuizShell
      question="What's the Luganda word for Cat?"
      options={['Kkapa', 'Cupa', 'Ppaapaali']}
      correctIndex={0}
      nextPath="/alphabet/10"
    />
  )
}
