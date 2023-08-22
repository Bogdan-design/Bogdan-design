import { MouseEventHandler } from 'react'

export type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

export type Column = { key: string; title: string; isSortable?: boolean }

type Props = {
  columns: Column[]
  onSort: (sort: Sort) => void
  sort: Sort
}

const dataAttributes = {
  sortable: 'data-sortable',
  name: 'data-name',
}

export const TableHeader = ({ columns, onSort, sort }: Props) => {
  const handelSorting: MouseEventHandler<HTMLTableHeaderCellElement> = e => {
    const isSortable = e.currentTarget.getAttribute(dataAttributes.sortable)
    const key = e.currentTarget.getAttribute(dataAttributes.name)

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
    <thead>
      <tr>
        {columns.map(column => {
          const showSort = column.isSortable && sort && sort.key === column.key

          return (
            <th
              {...{
                [dataAttributes.sortable]: column.isSortable,
                [dataAttributes.name]: column.key,
              }}
              key={column.title}
              onClick={handelSorting}
            >
              {column.title} {showSort && <span>{sort.direction === 'asc' ? '▲' : '▼'}</span>}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}
