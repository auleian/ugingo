import AlphabetQuizShell from '../components/AlphabetQuizShell'

export default function Alphabet11() {
  return (
    <AlphabetQuizShell
      question={"What sound does ‘Ŋ’ make?"}
      options={['Nga', 'Cha', 'Ja']}
      correctIndex={0}
      nextPath="/alphabet/12"
    />
  )
}
