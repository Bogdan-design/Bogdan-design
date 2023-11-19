import { useState } from 'react'

import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import ArrowBack from '../../assets/icon/arrow.back'
import Clear from '../../assets/icon/clear'
import Edit from '../../assets/icon/edit'
import Options from '../../assets/icon/options'
import {
  Button,
  ControlledCheckbox,
  ControlledTextField,
  Grade,
  Modal,
  Search,
  Table,
  Typography,
} from '../../component'
import { useDeleteCardMutation, useGetCardsQuery } from '../../services/cards/cards'
import { Sort } from '../../services/common/types'
import { useGetDeckByIdQuery } from '../../services/decks'
import { ServerError } from '../../services/decks/type'

import s from './cards.module.scss'

export const Cards = () => {
  const { id } = useParams<{ id: string }>()
  const [searchCards, setSearchCards] = useState('')
  const { data: cards } = useGetCardsQuery({ id: id || '', question: searchCards })
  const [deleteCard] = useDeleteCardMutation()
  const { data: deck } = useGetDeckByIdQuery(id || '')
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'asc' })
  const [openModal, setOpenModal] = useState(false)

  console.log(searchCards)

  const columns = [
    { key: 'question', title: 'Question', isSortable: true },
    { key: 'answer', title: 'Answer', isSortable: true },
    { key: 'updated', title: 'Last updated', isSortable: true },
    { key: 'grade', title: 'Grade', isSortable: true },
    { key: '', title: '' },
  ]

  const deleteCardHandler = (idCard: string) => {
    deleteCard(idCard)
      .unwrap()
      .then(() => {
        alert('Card is deleted!')
        toast.success('Card is deleted!')
      })
      .catch(error => {
        const serverError = error.data as ServerError

        alert(serverError.message)
        toast.error(serverError.message)
      })
  }

  const isEmpty = !!cards?.items.length

  if (!id) return <div>Deck not found</div>

  const { control, handleSubmit } = useForm({})

  function onHandelEdit(id) {}

  function addCardHandel() {
    setOpenModal(true)
  }

  function handelCreateCard(data: any) {}

  return (
    <section className={s.cards}>
      <Typography className={s.arrowBack} as={Link} to={'/'} variant={'body2'}>
        <ArrowBack />
        Back to Packs List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Typography variant={'h1'}>{deck?.name}</Typography>
          <button style={{ display: 'flex', justifyContent: 'space-between' }} className={s.delete}>
            <Options />
          </button>
        </div>
        {isEmpty && <Button variant={'primary'}>Learn to Pack</Button>}
      </div>
      <Modal
        size={'medium'}
        title={'Add New Card'}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <form className={s.modalForm} onSubmit={handleSubmit(handelCreateCard)}>
          <ControlledTextField label={'Name Pack'} name={'name'} control={control} />
          <ControlledTextField label={'Name Pack'} name={'name'} control={control} />
          <ControlledTextField label={'Name Pack'} name={'name'} control={control} />
          <div className={s.modalButtonSection}>
            <Button variant={'secondary'} onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Add New Card</Button>
          </div>
        </form>
      </Modal>
      {isEmpty && <Search fullWidth setSearch={setSearchCards} search={searchCards} />}
      {!isEmpty && (
        <div className={s.isEmpty}>
          <Typography className={s.isEmptyText} variant={'body2'}>
            This pack is empty. Click add new card to fill this pack
          </Typography>
          <Button variant={'primary'} onClick={addCardHandel}>
            Add New Card
          </Button>
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
                  <Table.Cell>
                    <button className={s.delete} onClick={() => onHandelEdit(card.id)}>
                      <Edit />
                    </button>
                    <button className={s.delete} onClick={() => deleteCardHandler(card.id)}>
                      <Clear />
                    </button>
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
