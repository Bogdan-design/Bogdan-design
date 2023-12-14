import { ChangeEvent } from 'react'

import { clsx } from 'clsx'

import Back from '../../assets/icon/back'

import s from './pagination.module.scss'

import { PaginatedEntity } from '@/app/types'
import { Typography } from '@/component'
import { Card } from '@/services/cards/cards.types'
import { DecksResponse } from '@/services/decks/type'

export const Pagination = ({
  data,
  currentPage,
  itemsPerPage,
  setCurrentPage,
  setItemsPerPage,
}: {
  data: DecksResponse | undefined | PaginatedEntity<Card>
  currentPage: number
  itemsPerPage: number
  setCurrentPage: (currentPage: number) => void
  setItemsPerPage: (itemsPerPage: number) => void
}) => {
  const pages: number[] = []

  if (data) {
    for (let i = 1; i < 5; i++) {
      pages.push(i)
    }
  }

  const onChangePageHandler = (page: number | undefined) => {
    if (page) {
      setCurrentPage(page)
    }
  }
  const onChangeItemPerPage = (value: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+value.currentTarget.value)
  }

  if (data && data?.items.length < 2) return null

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
