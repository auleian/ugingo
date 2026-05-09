import AlphabetQuizShell from '../../components/alphabet/AlphabetQuizShell'

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
