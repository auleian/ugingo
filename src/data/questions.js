export const QUESTIONS = [
  {
    id: 1,
    question: 'How much Luganda do you know?',
    options: [
      { id: 'beginner', label: "I'm a total beginner", icon: { type: 'stat', level: 0 } },
      { id: 'basic', label: 'I know basic words and phrases', icon: { type: 'stat', level: 1 } },
      { id: 'intermediate', label: 'I can hold conversations (Intermediate)', icon: { type: 'stat', level: 2 } },
      { id: 'fluent', label: "I'm fluent", icon: { type: 'stat', level: 3 } },
    ],
  },
  {
    id: 2,
    question: 'Why do you want to learn Luganda?',
    options: [
      { id: 'career', label: 'Career', leading: '💼' },
      { id: 'education', label: 'Education', leading: '📒' },
      { id: 'fun', label: 'Fun and culture', leading: '🎉' },
      { id: 'daily', label: 'Daily', leading: '🌈' },
      { id: 'travel', label: 'Travel', leading: '✈️' },
      { id: 'friends', label: 'Friends and family', leading: '👨‍👩‍👧' },
    ],
  },
  {
    id: 3,
    question: 'What is your daily goal for practicing?',
    options: [
      { id: '5', label: '5 min', leading: '📶', trailing: 'Casual' },
      { id: '10', label: '10 min', leading: '📶', trailing: 'Regular' },
      { id: '15', label: '15 min', leading: '📶', trailing: 'Accelerated' },
      { id: '20', label: '20 min', leading: '📶', trailing: 'Intense' },
    ],
  },
  {
    id: 4,
    question: 'How old are you?',
    options: [
      { id: '6-15', label: 'From 6 to 15 years old' },
      { id: '16-24', label: '16 to 24 years old' },
      { id: '25-34', label: '25 to 34 years old' },
      { id: '35-44', label: '35 to 44 years old' },
      { id: '45-54', label: '45 to 54 years old' },
      { id: '55-64', label: '55 to 64 years old' },
      { id: '65+', label: '65+' },
    ],
    layout: {
      cardHeight: 58,
      cardVerticalAlign: 'center',
      listLeft: 19,
      optionHeight: 47,
    },
  },
]
