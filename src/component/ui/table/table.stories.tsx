import { useState } from 'react'

const meta = {
  title: 'Tables/Table',
  tags: ['autodocs'],
}

export default meta

const data = [
  {
    title: 'Project A',
    cardsCount: 10,
    updated: '2023-07-07',
    createdBy: 'John Doe',
  },
  {
    title: 'Project B',
    cardsCount: 5,
    updated: '2023-07-06',
    createdBy: 'Jane Smith',
  },
  {
    title: 'Project C',
    cardsCount: 8,
    updated: '2023-07-05',
    createdBy: 'Alice Johnson',
  },
  {
    title: 'Project D',
    cardsCount: 3,
    updated: '2023-07-07',
    createdBy: 'Bob Anderson',
  },
  {
    title: 'Project E',
    cardsCount: 12,
    updated: '2023-07-04',
    createdBy: 'Emma Davis',
  },
]

type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

type Column = { key: string; title: string }

export const WithSort = {
  render: () => {
    const [sort, setSort] = useState<Sort>(null)

    console.log(sort)

    const handelSorting = (key: string) => {
      if (key !== sort?.key) {
        return setSort({ key, direction: 'asc' })
      }
      if (sort.direction === 'asc') {
        return setSort({ key, direction: 'desc' })
      }

      setSort(null)
    }

    const columns: Column[] = [
      {
        key: 'name',
        title: 'Name',
      },
      {
        key: 'cardsCount',
        title: 'Cards',
      },
      {
        key: 'updated',
        title: 'Last Updated',
      },
      {
        key: 'createdBy',
        title: 'Created by',
      },
      {
        key: 'options',
        title: '',
      },
    ]

    return (
      <table>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.title} onClick={() => handelSorting(column.key)}>
                {column.title}{' '}
                {sort && sort.key === column.key && (
                  <span>{sort.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.title}>
              <td>{item.title}</td>
              <td>{item.cardsCount}</td>
              <td>{item.updated}</td>
              <td>{item.createdBy}</td>
              <td>icons...</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  },
}
