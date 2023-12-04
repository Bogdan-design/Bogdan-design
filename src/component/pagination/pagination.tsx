import { ChangeEvent } from 'react'

import { clsx } from 'clsx'

import { useAppDispatch, useAppSelector } from '../../app/store'
import Back from '../../assets/icon/back'
import { Typography } from '../../component/ui'
import { decksSlice } from '../../services/decks/decks.slice'
import { DecksResponse } from '../../services/decks/type'

import s from './pagination.module.scss'

export const Pagination = ({ data }: { data: DecksResponse | undefined }) => {
  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const dispatch = useAppDispatch()

  const pages: number[] = []

  if (data) {
    for (let i = 1; i < 5; i++) {
      pages.push(i)
    }
  }

  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(decksSlice.actions.setItemPerPage(itemsPerPage))
  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))

  const onChangePageHandler = (page: number | undefined) => {
    if (page) {
      setCurrentPage(page)
    }
  }
  const onChangeItemPerPage = (value: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+value.currentTarget.value)
  }

  return (
    <div className={s.pagination}>
      <button className={s.paginationButton} onClick={() => onChangePageHandler(currentPage - 1)}>
        <Back />
      </button>
      {pages.length > 1 &&
        pages.map(p => {
          return (
            <span
              className={clsx(s.pages, p === currentPage && s.currentPage)}
              key={p}
              onClick={() => onChangePageHandler(p)}
            >
              {p}
            </span>
          )
        })}
      ...
      <div
        className={clsx(s.totalPages, data?.pagination.totalPages === currentPage && s.currentPage)}
        onClick={() => onChangePageHandler(data?.pagination.totalPages ?? 1)}
      >
        {data && data.pagination.totalPages}
      </div>
      <button className={s.paginationButton} onClick={() => onChangePageHandler(currentPage + 1)}>
        <Back style={{ transform: 'rotate(180deg)' }} />
      </button>
      <select
        className={s.itemsPerPage}
        style={{ background: 'black' }}
        defaultValue={itemsPerPage}
        onChange={onChangeItemPerPage}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>
      <Typography variant={'caption'}>Item per page</Typography>
    </div>
  )
}
