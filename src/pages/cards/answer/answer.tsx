import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button, Card, ControlledCheckbox, Typography } from '@/component'
import { Learn } from '@/pages/cards/learn/learn'
import { useGradeUpdateMutation } from '@/services/cards/cards'
import { Card as TypeOfCard } from '@/services/cards/cards.types'
import { ServerError } from '@/services/decks/type'

import s from './answer.module.scss'

const grade: GradeType[] = [
  'Did not know',
  'Forgot',
  'A lot of thought',
  'Confused',
  'Knew the answer',
]

type GradeType = 'Forgot' | 'A lot of thought' | 'Confused' | 'Knew the answer' | 'Did not know'

export const Answer = ({
  deckName,
  card,
  setShowAnswer,
  refetch,
}: {
  refetch: () => void
  deckName: string | undefined
  card: TypeOfCard
  setShowAnswer: (showAnswer: boolean) => void
}) => {
  const { answer, question } = card
  const [updateGrade] = useGradeUpdateMutation()
  const { control, handleSubmit, setValue } = useForm()

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (checked) {
      grade.forEach(grade => {
        setValue(grade, false)
      })

      setValue(name, true)
    }
  }

  const gradeHandelSubmit = (data: FieldValues) => {
    let values: GradeType[] = Object.values(data)
    let grade = 0

    for (let i = 0; i < values.length; i++) {
      if (values[i]) {
        switch (i) {
          case 0:
            grade = 1
            break
          case 1:
            grade = 2
            break
          case 2:
            grade = 3
            break
          case 3:
            grade = 4
            break
          case 4:
            grade = 5
            break
        }
        break
      }
    }

    updateGrade({ deckId: card.deckId, grade, cardId: card.id })
      .unwrap()
      .then(() => {
        alert('succeed')
        toast.success('succeed')
        setShowAnswer(false)
        refetch()

        return <Learn cardId={card.id} />
      })
      .catch(error => {
        const serverError = error.data as ServerError

        alert(serverError.message)
        toast.error(serverError.message)
      })
  }

  return (
    <Card className={s.cardQuestion}>
      <Typography style={{ textAlign: 'center' }} as={'h2'} variant={'h2'}>
        Learn {deckName}
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
      <form onSubmit={handleSubmit(gradeHandelSubmit)}>
        {grade.map((grade, i) => {
          return (
            <ControlledCheckbox
              key={i}
              label={grade}
              name={grade}
              control={control}
              onChange={checked => handleCheckboxChange(grade, checked)}
            />
          )
        })}
        <Button type={'submit'} fullWidth variant={'primary'}>
          Next Question
        </Button>
      </form>
    </Card>
  )
}
