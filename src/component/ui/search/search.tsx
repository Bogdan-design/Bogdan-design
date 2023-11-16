import { FC } from 'react'

import { clsx } from 'clsx'

import SearchIcon from '../../../assets/icon/search'
import { TextField } from '../../../component'

import s from './search.module.scss'

type Props = {
  className?: string
  fullWidth?: boolean
  search: string
  setSearch: (search: string) => void
  placeholder?: string
}

export const Search: FC<Props> = ({
  fullWidth,
  search,
  setSearch,
  placeholder = 'Input search',
  className,
}) => {
  const classNames = fullWidth ? clsx(s.search, className, s.fullWidth) : clsx(s.search, className)

  return (
    <section className={classNames}>
      <SearchIcon />
      <TextField
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
        placeholder={placeholder}
      />
    </section>
  )
}
