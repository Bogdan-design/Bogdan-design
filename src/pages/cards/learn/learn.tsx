import { useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import ArrowBack from '../../../assets/icon/arrow.back'
import { Button, Card, Typography } from '../../../component'
import { Answer } from '../../../pages/cards/answer'
import { useLearnCardsQuery } from '../../../services/cards/cards'
import { useGetDeckByIdQuery } from '../../../services/decks'

import s from './learn.module.scss'

export const Learn = ({ cardId }: { cardId?: string }) => {
  const { id } = useParams<string>()
  const {
    data: card,
    isLoading,
    refetch,
  } = useLearnCardsQuery({
    id: id || '',
    previousCardId: cardId || '',
  })
  const { data: deck } = useGetDeckByIdQuery(id || '')

  const [showAnswer, setShowAnswer] = useState(false)

  if (isLoading) return <div>Loading...</div>

  return (
    <div className={s.question}>
      <Typography className={s.arrowBack} as={Link} to={`/cards/${id}`} variant={'body2'}>
        <ArrowBack />
        Back to Packs List
      </Typography>
      <div className={s.cardBackground}>
        {!showAnswer ? (
          <Card className={s.cardQuestion}>
            <Typography style={{ textAlign: 'center' }} as={'h2'} variant={'h2'}>
              Learn {deck?.name}
            </Typography>
            <div>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <Typography as={'h2'} variant={'body2'}>
                Question: {card?.question}
              </Typography>
              <Typography style={{ color: 'var(--color-dark-100)' }} variant={'caption'}>
                Number of attempts to answer a question: 10
              </Typography>
            </div>
            <Button onClick={() => setShowAnswer(true)} fullWidth variant={'primary'}>
              Show Answer
            </Button>
          </Card>
        ) : (
          card && (
            <Answer
              refetch={refetch}
              deckName={deck?.name}
              setShowAnswer={setShowAnswer}
              card={card}
            />
          )
        )}
      </div>
    </div>
  )
}
