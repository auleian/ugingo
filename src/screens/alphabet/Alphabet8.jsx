import AlphabetQuizShell from '../../components/alphabet/AlphabetQuizShell'

export default function Alphabet8() {
  return (
    <AlphabetQuizShell
      question="Which letter represents Children (Abaana)?"
      options={['A', 'E', 'O']}
      correctIndex={0}
      nextPath="/alphabet/9"
    />
  )
}
