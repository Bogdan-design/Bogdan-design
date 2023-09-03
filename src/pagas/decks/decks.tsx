import { CSSProperties, useState } from 'react'

import { Button, TextField } from '../../component'
import { useCreateDeckMutation, useGetDecksQuery } from '../../services/decks'
import { decksSlice } from '../../services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '../../services/store.ts'

type Props = {
  width: string | number
  objectFit: CSSProperties['objectFit']
}

export const Decks = ({ width }: Props) => {
  const [cardName, setCardName] = useState('')
  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const searchByName = useAppSelector(state => state.decksSlice.searchByName)
  const dispatch = useAppDispatch()
  const { data, isLoading, refetch } = useGetDecksQuery({
    itemsPerPage,
    currentPage,
    name: searchByName,
    orderBy: 'created-desc',
  })

  const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDeckMutation()

  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(decksSlice.actions.setItemPerPage(itemsPerPage))
  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))
  const setSearch = (value: string) => dispatch(decksSlice.actions.setName(value))

  const handelCreateClicked = () => createDeck({ name: cardName })

  if (isLoading) return <div>loading...</div>

  return (
    <div style={{ width }}>
      <Button onClick={refetch}>refetch</Button>
      <div>
        <Button onClick={() => setItemsPerPage(10)}>itemsPerPage: 10</Button>
        <Button onClick={() => setItemsPerPage(30)}>itemsPerPage: 30</Button>
        <Button onClick={() => setItemsPerPage(40)}>itemsPerPage: 40</Button>
      </div>
      <div>
        <Button onClick={() => setCurrentPage(1)}>currentPage: 1</Button>
        <Button onClick={() => setCurrentPage(2)}>currentPage: 2</Button>
        <Button onClick={() => setCurrentPage(3)}>currentPage: 3</Button>
      </div>
      <TextField value={searchByName} onChange={e => setSearch(e.currentTarget.value)} />
      <TextField
        value={cardName}
        onChange={e => setCardName(e.currentTarget.value)}
        label={'Card name'}
      />
      <Button onClick={handelCreateClicked}>Create deck</Button>
      isCreateDeckLoading:{isCreateDeckLoading.toString()}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cards</th>
            <th>Last Updated</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map(deck => {
            return (
              <tr key={deck.id}>
                <td>{deck.name}</td>
                <td>{deck.cardsCount}</td>
                <td>{new Date(deck.updated).toLocaleString('en-GB')}</td>
                <td>{deck.author.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
