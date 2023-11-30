import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from '../../app/store'
import Clear from '../../assets/icon/clear'
import Edit from '../../assets/icon/edit'
import Play from '../../assets/icon/play'
import { Search } from '../../component/ui/search/search'
import { EditDeckModal } from '../../pages/cards/drop.down.menu/edit.deck'
import { useUpdateProfileMutation } from '../../services/auth/auth.service'
import { Sort } from '../../services/common/types'
import { useCreateDeckMutation, useGetDecksQuery } from '../../services/decks'
import { decksSlice } from '../../services/decks/decks.slice'
import { ServerError } from '../../services/decks/type'

import {
  Button,
  Column,
  ControlledCheckbox,
  ControlledTextField,
  Controls,
  Modal,
  Table,
  TableSwitcher,
  Typography,
} from './../../component'
import s from './deck.module.scss'
import { useDeleteDeck } from './delete.deck'

const newDeckSchema = z.object({
  name: z.string().min(3).max(30),
  cover: z.instanceof(File).optional(),
  isPrivate: z.boolean(),
})

type NewDeckType = z.infer<typeof newDeckSchema>

export const Decks = () => {
  const [range, setRange] = useState([0, 100])
  const [rangeValue, setRangeValue] = useState([0, 1])
  const [author, setAuthor] = useState('')
  const [currentTable, setCurrentTable] = useState('All Cards')
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'asc' })
  const [openModal, setOpenModal] = useState(false)
  const [editModal, setEditModal] = useState(false)

  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const searchByName = useAppSelector(state => state.decksSlice.searchByName)
  const [value, setValue] = useState<File>()
  const [updateProfile] = useUpdateProfileMutation()
  const dispatch = useAppDispatch()
  const deleteDeckHandler = useDeleteDeck()

  const { data, isLoading } = useGetDecksQuery({
    itemsPerPage,
    currentPage,
    minCardsCount: range[0],
    maxCardsCount: range[1],
    authorId: author,
    name: searchByName,
    orderBy: 'created-desc',
  })

  const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDeckMutation()

  useEffect(() => {
    if (rangeValue[1] !== data?.maxCardsCount) {
      setRangeValue(prev => [prev[0], data?.maxCardsCount || 100])
    }
  }, [data?.maxCardsCount])

  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(decksSlice.actions.setItemPerPage(itemsPerPage))
  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))
  const setSearch = (value: string) => dispatch(decksSlice.actions.setName(value))

  const columns: Column[] = [
    {
      key: 'name',
      title: 'Name',
      isSortable: true,
    },
    {
      key: 'cardsCount',
      title: 'Cards',
      isSortable: true,
    },
    {
      key: 'updated',
      title: 'Last Updated',
      isSortable: true,
    },
    {
      key: 'author.name',
      title: 'Author',
      isSortable: true,
    },
    {
      key: 'actions',
      title: '',
    },
  ]

  const clearFiltersHandler = () => {
    setAuthor('')
    setCurrentTable('All Cards')
    dispatch(decksSlice.actions.setName(''))
    setRangeValue([0, data?.maxCardsCount || 100])
  }

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(newDeckSchema),
    defaultValues: {
      isPrivate: false,
      name: '',
    },
  })
  const handelCreateDeck = (data: NewDeckType) => {
    createDeck(data)
      .unwrap()
      .then(() => {
        setOpenModal(false)
        toast.success('You deck is created!')
      })
      .catch(error => {
        const serverError = error.data as ServerError

        toast.error(serverError.message)
      })
  }

  if (isLoading || isCreateDeckLoading) return <div>loading...</div>

  return (
    <section>
      <Modal
        size={'medium'}
        title={'Add New Pack'}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <form className={s.modalForm} onSubmit={handleSubmit(handelCreateDeck)}>
          <ControlledTextField label={'Name Pack'} name={'name'} control={control} />
          <ControlledCheckbox label={'Private pack'} name={'isPrivate'} control={control} />
          <div className={s.modalButtonSection}>
            <Button variant={'secondary'} onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Add New Pack</Button>
          </div>
        </form>
      </Modal>
      <EditDeckModal deck={data} openModal={editModal} setOpenModal={setEditModal} />
      <div className={s.decks}>
        <div className={s.decksHeader}>
          <Typography variant={'large'}>Packs list</Typography>
          <Button onClick={() => setOpenModal(true)}>Add New Pack</Button>
        </div>
        <div className={s.filter}>
          <Search search={searchByName} setSearch={setSearch} placeholder={'Input search'} />
          <Controls
            onValueCommit={setRange}
            value={rangeValue}
            onValueChange={setRangeValue}
            max={data?.maxCardsCount}
          />
          <TableSwitcher
            currentTable={currentTable}
            setCurrentTable={setCurrentTable}
            setAuthor={setAuthor}
          />
          <Button onClick={clearFiltersHandler} className={s.clear} variant={'secondary'}>
            <Clear />
            Clear Filter
          </Button>
        </div>
        <Table.Root>
          <Table.Header
            columns={columns}
            sort={sort}
            onSort={setSort}
            className={s.thead}
          ></Table.Header>

          <Table.Body>
            {data?.items.map(deck => {
              return (
                <Table.Row key={deck.id}>
                  <Table.Cell>
                    <Link className={s.deckName} to={`/cards/${deck.id}`}>
                      {deck.name}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{deck.cardsCount}</Table.Cell>
                  <Table.Cell>{dayjs(deck.updated).format('DD.MM.YYYY')}</Table.Cell>
                  <Table.Cell>{deck.author.name}</Table.Cell>
                  <Table.Cell>
                    <button className={s.delete} onClick={() => deleteDeckHandler(deck.id)}>
                      <Play />
                    </button>
                    <button className={s.delete} onClick={() => setEditModal(true)}>
                      <Edit />
                    </button>
                    <button className={s.delete} onClick={() => deleteDeckHandler(deck.id)}>
                      <Clear />
                    </button>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      </div>
    </section>
  )
}
