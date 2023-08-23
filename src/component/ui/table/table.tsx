import { ComponentPropsWithoutRef, MouseEventHandler } from 'react'

import { clsx } from 'clsx'

import { ChevronUp } from '../../../assets/icon'

import s from './table.module.scss'

export type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export type Column = { key: string; title: string; isSortable?: boolean }

type Props = Omit<
  ComponentPropsWithoutRef<'thead'> & {
    columns: Column[]
    onSort: (sort: Sort) => void
    sort: Sort
  },
  'children'
>

const dataAttributes = {
  sortable: 'data-sortable',
  name: 'data-name',
} as const

export const TableHeader = ({ columns, onSort, sort, ...restProps }: Props) => {
  const handelSorting: MouseEventHandler<HTMLTableRowElement> = e => {
    if (!(e.target instanceof HTMLTableCellElement)) return
    const isSortable = e.target.getAttribute(dataAttributes.sortable)
    const key = e.target.getAttribute(dataAttributes.name)

    if (key === null) throw new Error('No data-name found!')

    if (!isSortable) return
    if (key !== sort?.key) {
      return onSort({ key, direction: 'asc' })
    }
    if (sort.direction === 'asc') {
      return onSort({ key, direction: 'desc' })
    }

    onSort(null)
  }

  return (
    <thead className={s.root} {...restProps}>
      <tr onClick={handelSorting}>
        {columns.map(column => {
          const showSort = column.isSortable && sort && sort.key === column.key

          return (
            <th
              {...{
                [dataAttributes.sortable]: column.isSortable,
                [dataAttributes.name]: column.key,
              }}
              key={column.title}
              className={s.th}
            >
              <span>
                {column.title}{' '}
                {showSort && (
                  <ChevronUp className={clsx(sort.direction === 'desc' && s.chevronDown)} />
                )}
              </span>
            </th>
          )
        })}
      </tr>
    </thead>
  )
}
