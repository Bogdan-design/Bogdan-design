import { useState } from 'react'

import dayjs from 'dayjs'
import { Link, useParams } from 'react-router-dom'

import ArrowBack from '../../assets/icon/arrow.back'
import Clear from '../../assets/icon/clear'
import { Button, Search, Table, Typography } from '../../component'
import { useGetCardsQuery, useDeleteCardMutation } from '../../services/cards/cards'
import { useGetDeckByIdQuery } from '../../services/decks'

import s from './cards.module.scss'

export const Cards = () => {
  const { id } = useParams<{ id: string }>()
  const [searchCards, setSearchCards] = useState('')
  const { data: cards } = useGetCardsQuery({ id: id || '' })
  const [deleteCard] = useDeleteCardMutation()
  const { data: deck } = useGetDeckByIdQuery(id || '')

  console.log(cards)
  const columns = [
    { key: 'question', title: 'Question', isSortable: true },
    { key: 'answer', title: 'Answer', isSortable: true },
    { key: 'updated', title: 'Last updated', isSortable: true },
  ]

  const deleteCardHandler = (idCard: string) => {
    deleteCard(idCard)
  }

  if (!id) return <div>Deck not found</div>

  return (
    <section className={s.cards}>
      <Typography className={s.arrowBack} as={Link} to={'/'} variant={'body2'}>
        <ArrowBack />
        Back to Packs List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant={'h1'}>{deck?.name}</Typography>
        <Button variant={'primary'}>Learn to Pack</Button>
      </div>
      <Search fullWidth setSearch={setSearchCards} search={searchCards} />
      <div className={s.isEmpty}>
        <Typography className={s.isEmptyText} variant={'body2'}>
          This pack is empty. Click add new card to fill this pack
        </Typography>
        <Button variant={'primary'}>Add New Card</Button>
      </div>
      <Table.Root>
        {/*<Table.Header*/}
        {/*  columns={columns}*/}
        {/*  sort={sort}*/}
        {/*  onSort={setSort}*/}
        {/*  className={s.thead}*/}
        {/*></Table.Header>*/}

        <Table.Body>
          {cards?.items.map(card => {
            return (
              <Table.Row key={card.id}>
                <Table.Cell>{card.question}</Table.Cell>
                <Table.Cell>{card.answer}</Table.Cell>
                <Table.Cell>{dayjs(card.updated).format('DD.MM.YYYY')}</Table.Cell>
                <Table.Cell>{card.rating}</Table.Cell>
                <Table.Cell>
                  <button className={s.delete} onClick={() => deleteCardHandler(card.id)}>
                    <Clear />
                  </button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </section>
  )
}
