import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from '../../app/store'
import Clear from '../../assets/icon/clear'
import Search from '../../assets/icon/search'
import { useUpdateProfileMutation } from '../../services/auth/auth.service'
import { Sort } from '../../services/common/types'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
} from '../../services/decks'
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
  TextField,
  Typography,
} from './../../component'
import s from './deck.module.scss'

import newPasswordStories from 'component/auth/new.password/new.password.stories'

const newDeckSchema = z.object({
  name: z.string().min(3).max(30),
  cover: z.instanceof(File).optional(),
  isPrivate: z.boolean(),
})

type NewDeckType = z.infer<typeof newPasswordStories>

export const Decks = () => {
  const [deckName, setDeckName] = useState('')
  const [range, setRange] = useState([0, 100])
  const [rangeValue, setRangeValue] = useState([0, 1])
  const [author, setAuthor] = useState('')
  const [currentTable, setCurrentTable] = useState('All Cards')
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'asc' })
  const [openModal, setOpenModal] = useState(true)

  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const searchByName = useAppSelector(state => state.decksSlice.searchByName)
  const [value, setValue] = useState<File>()
  const [updateProfile] = useUpdateProfileMutation()
  const dispatch = useAppDispatch()

  const { data, isLoading, refetch } = useGetDecksQuery({
    itemsPerPage,
    currentPage,
    minCardsCount: range[0],
    maxCardsCount: range[1],
    authorId: author,
    name: searchByName,
    orderBy: 'created-desc',
  })

  const [deleteDeck, { error }] = useDeleteDeckMutation()

  const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDeckMutation()

  useEffect(() => {
    if (rangeValue[1] !== data?.maxCardsCount) {
      setRangeValue(prev => [prev[0], data?.maxCardsCount || 100])
    }
  }, [data?.maxCardsCount])

  const deleteDeckHandler = async (id: string) => {
    await deleteDeck({ id })
    if (error && 'data' in error) {
      const serverError = error.data as ServerError

      if (serverError.statusCode === 403) {
        alert(serverError.message)
        toast.error(serverError.message) // This will display "You can't delete a deck that you don't own" if the status code is 403
      } else {
        toast.error('An unexpected error occurred')
      }
    } else {
      toast.success('Deck is successfully deleted!')
    }
  }

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
  }

  if (isLoading) return <div>loading...</div>

  return (
    <div>
      <Modal
        size={'medium'}
        title={'Add New Pack'}
        openModal={openModal}
        setOpenModal={setOpenModal}
      >
        <form className={s.modalForm} onSubmit={handleSubmit(handelCreateDeck)}>
          <ControlledTextField label={'Name Pack'} name={'namePack'} control={control} />
          <ControlledCheckbox label={'Private pack'} name={'privatePack'} control={control} />
          <div className={s.modalButtonSection}>
            <Button variant={'secondary'} onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Add New Pack</Button>
          </div>
        </form>
      </Modal>
      <section className={s.decks}>
        <div className={s.decksHeader}>
          <Typography variant={'large'}>Packs list</Typography>
          <Button onClick={() => setOpenModal(true)}>Add New Pack</Button>
        </div>
        <div className={s.filter}>
          <div className={s.search}>
            <Search />
            <TextField
              value={searchByName}
              onChange={e => setSearch(e.currentTarget.value)}
              placeholder={'Input search'}
            />
          </div>
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
                      <Clear />
                    </button>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      </section>
    </div>
  )
}
