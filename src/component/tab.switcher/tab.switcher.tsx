import { FC, useState } from 'react'

import { Typography, Switcher } from '../../component/ui'
import { useMeQuery } from '../../services/auth/auth.service'

import s from './tab.switcher.module.scss'

type PropsType = {
  setAuthor: (arg: string) => void
}

export const TableSwitcher: FC<PropsType> = ({ setAuthor }) => {
  const { data } = useMeQuery()
  const options = ['My Cards', 'All Cards']
  const [currentTable, setCurrentTable] = useState('All Cards')

  if (data) {
    switch (currentTable) {
      case 'My Cards':
        setAuthor(data.id)
        break
      case 'All Cards':
        setAuthor('')
        break
      default:
        setAuthor('')
        break
    }
  }

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
