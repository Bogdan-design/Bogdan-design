import { FC } from 'react'

type Props = {
  options?: string[]
}

export const Select: FC<Props> = ({ options }) => {
  return <select>{options?.map(option => option)}</select>
}
