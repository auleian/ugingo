import AlphabetQuizShell from '../components/AlphabetQuizShell'

export default function Alphabet10() {
  return (
    <AlphabetQuizShell
      question="Which letter is NOT in the Luganda alphabet?"
      options={['Z', 'Q', 'G']}
      correctIndex={1}
      nextPath="/alphabet/11"
    />
  )
}
