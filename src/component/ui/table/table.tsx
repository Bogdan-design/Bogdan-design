import { ComponentProps, ComponentPropsWithoutRef, FC } from 'react'

import { clsx } from 'clsx'

import { ChevronUp } from '../../../assets/icon'
import { Typography } from '../../../component/ui/typography'
import { Sort } from '../../../services/common/types'

import s from './table.module.scss'

export type RootProps = ComponentProps<'table'>

export const Root: FC<RootProps> = ({ className, ...rest }) => {
  const classNames = {
    table: clsx(className, s.table),
  }

  return <table className={classNames.table} {...rest} />
}

export type HeadProps = ComponentProps<'thead'>

export const Head: FC<HeadProps> = props => {
  return <thead {...props} />
}

export type Column = { key: string; title: string; isSortable?: boolean }

type Props = Omit<
  ComponentPropsWithoutRef<'thead'> & {
    columns: Column[]
    onSort: (sort: Sort) => void
    sort: Sort
  },
  'children'
>

export const Header = ({ columns, onSort, sort, ...restProps }: Props) => {
  const classNames = {
    chevron: sort?.direction === 'asc' ? '' : s.chevronDown,
  }

  const handleSort = (key: string, isSortable?: boolean) => () => {
    if (!onSort || !isSortable) return

    if (sort?.key !== key) return onSort({ key, direction: 'asc' })

    if (sort.direction === 'desc') return onSort(null)

    return onSort({
      key,
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  return (
    <Head {...restProps}>
      <Row>
        {columns.map(({ title, key, isSortable }) => (
          <HeadCell key={key} onClick={handleSort(key, isSortable)} sortable={isSortable}>
            {title}
            {sort?.key === key ? <ChevronUp className={classNames.chevron} /> : ''}
          </HeadCell>
        ))}
      </Row>
    </Head>
  )
}

export type BodyProps = ComponentProps<'tbody'>

export const Body: FC<BodyProps> = props => {
  return <tbody {...props} />
}

export type RowProps = ComponentProps<'tr'>

export const Row: FC<RowProps> = props => {
  return <tr {...props} />
}

export type HeadCellProps = ComponentProps<'th'> & {
  sortable?: boolean
}

export const HeadCell: FC<HeadCellProps> = ({ className, children, sortable, ...rest }) => {
  const classNames = {
    headCell: clsx(className, s.headCell, sortable && s.sortable),
  }

  return (
    <th className={classNames.headCell} {...rest}>
      <span>{children}</span>
    </th>
  )
}

export type CellProps = ComponentProps<'td'>

export const Cell: FC<CellProps> = ({ className, ...rest }) => {
  const classNames = {
    cell: clsx(className, s.tableCell),
  }

  return <td className={classNames.cell} {...rest} />
}

export const Empty: FC<ComponentProps<'div'> & { mt?: string; mb?: string }> = ({
  className,
  mt = '89px',
  mb,
}) => {
  const classNames = {
    empty: clsx(className, s.empty),
  }

  return (
    <Typography
      variant={'h2'}
      className={classNames.empty}
      style={{ marginTop: mt, marginBottom: mb }}
    >
      No data
    </Typography>
  )
}

export const Table = {
  Root,
  Head,
  Header,
  Body,
  Row,
  HeadCell,
  Cell,
  Empty,
}
