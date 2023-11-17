import EmptyStar from '../../assets/icon/emptyStar'
import Star from '../../assets/icon/star'

export const Grade = ({ rating }: { rating: number }) => {
  console.log(rating)
  const rateComponent = () => {
    return Array.from({ length: 5 }, (_, i) => <EmptyStar key={i} />).fill(<Star />, 0, rating)
  }

  return <section>{rateComponent()}</section>
}
