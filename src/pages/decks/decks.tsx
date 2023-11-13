import { useEffect, useState } from 'react'

import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

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
  Controls,
  Table,
  TableSwitcher,
  TextField,
  Typography,
} from './../../component'
import s from './deck.module.scss'

export const Decks = () => {
  const [deckName, setDeckName] = useState('')
  const [range, setRange] = useState([0, 100])
  const [rangeValue, setRangeValue] = useState([0, 1])
  const [author, setAuthor] = useState('')
  const [currentTable, setCurrentTable] = useState('All Cards')
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'asc' })
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

  console.log(author)

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

  const handelCreateClicked = () => createDeck({ name: deckName })

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

  if (isLoading) return <div>loading...</div>

  const clearFiltersHandler = () => {
    setAuthor('')
    setCurrentTable('All Cards')
    dispatch(decksSlice.actions.setName(''))
    setRangeValue([0, data?.maxCardsCount || 100])
  }

  return (
    <section className={s.decks}>
      <div className={s.decksHeader}>
        <Typography variant={'large'}>Packs list</Typography>
        <Button>Add New Pack</Button>
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
      {/*<input type={'file'} onChange={e => setValue(e.currentTarget.files?.[0])} />*/}
      {/*<Button*/}
      {/*  onClick={() => {*/}
      {/*    const formData = new FormData()*/}

      {/*    if (value) formData.append('avatar', value)*/}

      {/*    updateProfile(formData)*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Update avatar*/}
      {/*</Button>*/}
      {/*<Button onClick={refetch}>refetch</Button>*/}
      {/*<div>*/}
      {/*  <Button onClick={() => setItemsPerPage(10)}>itemsPerPage: 10</Button>*/}
      {/*  <Button onClick={() => setItemsPerPage(30)}>itemsPerPage: 30</Button>*/}
      {/*  <Button onClick={() => setItemsPerPage(40)}>itemsPerPage: 40</Button>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <Button onClick={() => setCurrentPage(1)}>currentPage: 1</Button>*/}
      {/*  <Button onClick={() => setCurrentPage(2)}>currentPage: 2</Button>*/}
      {/*  <Button onClick={() => setCurrentPage(3)}>currentPage: 3</Button>*/}
      {/*</div>*/}
      {/*<TextField*/}
      {/*  value={cardName}*/}
      {/*  onChange={e => setCardName(e.currentTarget.value)}*/}
      {/*  label={'Card name'}*/}
      {/*/>*/}
      {/*<Button onClick={handelCreateClicked}>Create deck</Button>*/}
      {/*isCreateDeckLoading:{isCreateDeckLoading.toString()}*/}

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
  )
}
