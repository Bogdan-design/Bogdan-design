import { useGetDecksQuery } from '../../services/decks'

export const Decks = () => {
  const { data, isLoading } = useGetDecksQuery(undefined)

  return (
    <div>
      isLoading: {isLoading.toString()}
      {JSON.stringify(data)}
    </div>
  )
}
