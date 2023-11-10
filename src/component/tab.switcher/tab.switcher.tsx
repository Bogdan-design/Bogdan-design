import { useState } from 'react'

import { Typography } from '../../component/ui'
import { Switcher } from '../../component/ui/switcher/switcher'

import s from './tab.switcher.module.scss'

export const TableSwitcher = () => {
  const options = ['My Cards', 'All Cards']
  const [currentTable, setCurrentTable] = useState('cards')

  const renderTable = () => {
    switch (currentTable) {
      case 'My Cards':
        return <div>Cards</div>
      case 'All Cards':
        return <div>All cards</div>
      default:
        return <div>Cards</div>
    }
  }

  return (
    <div className={s.switcher}>
      <Typography variant={'body2'}>Show packs cards</Typography>
      <div className={s.options}>
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
      {/*{renderTable()}*/}
    </div>
  )
}
