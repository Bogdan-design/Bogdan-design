// export type ResponseCards = {
//   id: string
//   deckId: string
//   userId: string
//   question: string
//   answer: string
//   shots: number
//   answerImg: string
//   questionImg: string
//   questionVideo: string
//   answerVideo: string
//   rating: number
//   created: string
//   updated: string
// }
export type Card = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: any
  answerImg?: any
  questionVideo?: any
  answerVideo?: any
  created: string
  updated: string
  shots: number
  grade: number
  userId: string
}
