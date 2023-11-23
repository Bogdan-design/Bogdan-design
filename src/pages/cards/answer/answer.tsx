import { Button, Card, ControlledCheckbox, Typography } from '../../../component'
import { Card as TypeOfCard } from '../../../services/cards/cards.types'

import s from './answer.module.scss'

export const Answer = ({ card }: { card: TypeOfCard }) => {
  const { answer, question } = card

  const grade = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

  return (
    <Card className={s.cardQuestion}>
      <Typography style={{ textAlign: 'center' }} as={'h2'} variant={'h2'}>
        Learn “Pack Name”
      </Typography>
      <div>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Typography as={'h2'} variant={'body2'}>
          Question: {question}
        </Typography>
        <Typography style={{ color: 'var(--color-dark-100)' }} variant={'caption'}>
          Number of attempts to answer a question: 10
        </Typography>
      </div>
      <Typography as={'h2'} variant={'body2'}>
        Answer: {answer}
      </Typography>
      <Typography as={'h2'} variant={'body2'}>
        Rate yourself:
      </Typography>
      <div>
        {grade.map((grade, i) => {
          return <ControlledCheckbox key={i} name={grade} />
        })}
      </div>
      <Button fullWidth variant={'primary'}>
        Next Question
      </Button>
    </Card>
  )
}
