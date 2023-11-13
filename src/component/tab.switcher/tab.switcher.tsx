import { FC } from 'react'

import { Switcher, Typography } from '../../component/ui'
import { useMeQuery } from '../../services/auth/auth.service'

import s from './tab.switcher.module.scss'

type PropsType = {
  currentTable: string
  setCurrentTable: (currentTable: string) => void
  setAuthor: (author: string) => void
}

export const TableSwitcher: FC<PropsType> = ({ setCurrentTable, currentTable, setAuthor }) => {
  const { data } = useMeQuery()
  const options = ['My Cards', 'All Cards']

  data && currentTable !== 'All Cards' ? setAuthor(data.id) : setAuthor('')

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
