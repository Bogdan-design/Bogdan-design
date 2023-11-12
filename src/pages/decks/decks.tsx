import { useEffect, useState } from 'react'

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

import {
  Button,
  TextField,
  Typography,
  TableSwitcher,
  Controls,
  Table,
  Column,
} from './../../component'
import s from './deck.module.scss'

export const Decks = () => {
  const [cardName, setCardName] = useState('')
  const [range, setRange] = useState([0, 100])
  const [rangeValue, setRangeValue] = useState([0, 1])
  const [author, setAuthor] = useState('')
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

  const [deleteDesk] = useDeleteDeckMutation()

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

  const handelCreateClicked = () => createDeck({ name: cardName })

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
        <TableSwitcher setAuthor={setAuthor} />
        <Button className={s.clear} variant={'secondary'}>
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

      <Table.Root className={s.table}></Table.Root>
      <Table.Header
        columns={columns}
        sort={sort}
        onSort={setSort}
        className={s.thead}
      ></Table.Header>

      <tbody>
        {data?.items.map(deck => {
          return (
            <tr className={s.tbody} key={deck.id}>
              <td>{deck.name}</td>
              <td>{deck.cardsCount}</td>
              <td>{new Date(deck.updated).toLocaleString('en-GB')}</td>
              <td>{deck.author.name}</td>
              <td>
                <Button onClick={() => deleteDesk}>delete</Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </section>
  )
}
