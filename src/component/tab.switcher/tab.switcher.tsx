import { FC, useEffect } from 'react'

import s from './tab.switcher.module.scss'

import { Switcher, Typography } from '@/component'
import { useMeQuery } from '@/services/auth/auth.service'

type PropsType = {
  currentTable: string
  setCurrentTable: (currentTable: string) => void
  setAuthor: (author: string) => void
}

export const TableSwitcher: FC<PropsType> = ({ setCurrentTable, currentTable, setAuthor }) => {
  const { data } = useMeQuery()
  const options = ['My Cards', 'All Cards']

  useEffect(() => {
    if (data && currentTable !== 'All Cards') {
      setAuthor(data.id)
    } else {
      setAuthor('')
    }
  }, [data, currentTable, setAuthor])

  return (
    <div className={s.switcher}>
      <Typography className={s.label} as={'label'} htmlFor={'switcher'} variant={'body2'}>
        Show packs cards
      </Typography>
      <div id={'switcher'} className={s.options}>
        {options.map((option, index) => {
          return (
            <Switcher
              onClick={() => setCurrentTable(option)}
              key={index}
              variant={currentTable === option ? 'active' : 'default'}
            >
              {option}
            </Switcher>
          )
        })}
      </div>
    </div>
  )
}
