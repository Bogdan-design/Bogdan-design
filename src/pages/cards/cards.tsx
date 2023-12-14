import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import ArrowBack from '../../assets/icon/arrow.back'
import Clear from '../../assets/icon/clear'
import Edit from '../../assets/icon/edit'
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
} from '../../services/cards/cards'
import { cardsSlice } from '../../services/cards/cards.slise'
import { Sort } from '../../services/common/types'
import { ServerError } from '../../services/decks/type'

import s from './cards.module.scss'

import { useAppDispatch, useAppSelector } from '@/app/store'
import {
  Button,
  ControlledTextField,
  EditCard,
  Grade,
  Modal,
  Pagination,
  Search,
  Table,
  Typography,
} from '@/component'
import { DropDownMenu } from '@/pages'
import { useMeQuery } from '@/services/auth/auth.service'

const newDeckSchema = z.object({
  question: z.string().min(3).max(30),
  answer: z.string().min(3).max(30),
})

type NewDeckType = z.infer<typeof newDeckSchema>

export const Cards = () => {
  const { id } = useParams<{ id: string }>()
  const [searchCards, setSearchCards] = useState('')
  const { data: user } = useMeQuery()
  const [createCard] = useCreateCardMutation()
  const [deleteCard] = useDeleteCardMutation()
  const currentPage = useAppSelector(state => state.cardsSlice.currentPage)
  const itemsPerPage = useAppSelector(state => state.cardsSlice.itemsPerPage)
  const { data: cards, isLoading } = useGetCardsQuery({ id: id || '', currentPage, itemsPerPage })
  const dispatch = useAppDispatch()

  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(cardsSlice.actions.setItemPerPage(itemsPerPage))
  const setCurrentPage = (currentPage: number) =>
    dispatch(cardsSlice.actions.setCurrentPage(currentPage))

  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'asc' })
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openModalDeleteCard, setOpenModalDeleteCard] = useState(false)

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

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(newDeckSchema),
    defaultValues: {
      question: '',
      answer: '',
    },
  })

  function addCardHandel() {
    setOpenModal(true)
  }

  function handelCreateCard(data: NewDeckType) {
    createCard({ id, ...data })
      .unwrap()
      .then(() => {
        setOpenModal(false)
        toast.success('You card is created!')
        alert('You card is created!')
      })
      .catch(error => {
        const serverError = error.data as ServerError

        toast.error(serverError.message)

        alert(serverError.message)
      })
  }

  const button = () => {
    const isMyDeck = user?.id === cards?.items[0].userId

    return isMyDeck ? (
      <Button variant={'primary'} onClick={addCardHandel}>
        Add New Card
      </Button>
    ) : (
      <Button
        style={{ color: 'var(--color-light-100)' }}
        as={Link}
        to={`/cards/${id}/learn`}
        variant={'primary'}
      >
        Learn to Pack
      </Button>
    )
  }

  if (!id) return <div>Deck not found</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <section className={s.cards}>
      <Typography className={s.arrowBack} as={Link} to={'/'} variant={'body2'}>
        <ArrowBack />
        Back to Packs List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DropDownMenu id={id} />

        {isEmpty && button()}
      </div>
      <Modal
        size={'medium'}
        title={'Add New Card'}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <form className={s.modalForm} onSubmit={handleSubmit(handelCreateCard)}>
          <ControlledTextField label={'Question'} name={'question'} control={control} />
          <ControlledTextField label={'Answer'} name={'answer'} control={control} />
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
                    <button className={s.delete} onClick={() => setOpenEditModal(true)}>
                      <EditCard
                        cardId={card.id}
                        openModal={openEditModal}
                        setOpenModal={setOpenEditModal}
                      />
                      <Edit />
                    </button>
                    <Modal
                      size={'medium'}
                      title={'Delete Card'}
                      openModal={openModalDeleteCard}
                      setOpenModal={setOpenModalDeleteCard}
                    >
                      <Typography variant={'body2'}>
                        Do you really want to remove card? All cards will be deleted.
                      </Typography>
                      <div className={s.modalButtonSection}>
                        <Button variant={'secondary'} onClick={() => setOpenModalDeleteCard(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => deleteCardHandler(card.id)}>Delete Pack</Button>
                      </div>
                    </Modal>
                    <button className={s.delete} onClick={() => setOpenModalDeleteCard(true)}>
                      <Clear />
                    </button>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      )}
      <Pagination
        data={cards}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  )
}
