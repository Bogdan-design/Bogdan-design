import { useState } from 'react'

import dayjs from 'dayjs'
import { Link, useParams } from 'react-router-dom'

import ArrowBack from '../../assets/icon/arrow.back'
import { Button, Grade, Search, Table, Typography } from '../../component'
import { useGetCardsQuery } from '../../services/cards/cards'
import { Sort } from '../../services/common/types'
import { useGetDeckByIdQuery } from '../../services/decks'

import s from './cards.module.scss'

export const Cards = () => {
  const { id } = useParams<{ id: string }>()
  const [searchCards, setSearchCards] = useState('')
  const { data: cards } = useGetCardsQuery({ id: id || '' })
  // const [deleteCard] = useDeleteCardMutation()
  const { data: deck } = useGetDeckByIdQuery(id || '')
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'asc' })

  console.log(cards)
  const columns = [
    { key: 'question', title: 'Question', isSortable: true },
    { key: 'answer', title: 'Answer', isSortable: true },
    { key: 'updated', title: 'Last updated', isSortable: true },
    { key: 'grade', title: 'Grade', isSortable: true },
  ]

  // const deleteCardHandler = (idCard: string) => {
  //   deleteCard(idCard)
  //     .unwrap()
  //     .then(() => {
  //       alert('Card is deleted!')
  //       toast.success('Card is deleted!')
  //     })
  //     .catch(error => {
  //       const serverError = error.data as ServerError
  //
  //       alert(serverError.message)
  //       toast.error(serverError.message)
  //     })
  // }

  const isEmpty = !!cards?.items.length

  if (!id) return <div>Deck not found</div>

  return (
    <section className={s.cards}>
      <Typography className={s.arrowBack} as={Link} to={'/'} variant={'body2'}>
        <ArrowBack />
        Back to Packs List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant={'h1'}>{deck?.name}</Typography>
        {isEmpty && <Button variant={'primary'}>Learn to Pack</Button>}
      </div>
      {isEmpty && <Search fullWidth setSearch={setSearchCards} search={searchCards} />}
      {!isEmpty && (
        <div className={s.isEmpty}>
          <Typography className={s.isEmptyText} variant={'body2'}>
            This pack is empty. Click add new card to fill this pack
          </Typography>
          <Button variant={'primary'}>Add New Card</Button>
        </div>
      )}
      {isEmpty && (
        <Table.Root>
          <Table.Header
            columns={columns}
            sort={sort}
            onSort={setSort}
            className={s.thead}
          ></Table.Header>

          <Table.Body>
            {cards?.items.map(card => {
              return (
                <Table.Row key={card.id}>
                  <Table.Cell>{card.question}</Table.Cell>
                  <Table.Cell>{card.answer}</Table.Cell>
                  <Table.Cell>{dayjs(card.updated).format('DD.MM.YYYY')}</Table.Cell>
                  <Table.Cell>
                    <Grade rating={card.grade} />
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      )}
    </section>
  )
}
