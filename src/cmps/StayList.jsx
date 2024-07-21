import { Link } from 'react-router-dom'
import { StayPreview } from './StayPreview'

export function StayList({ stays }) {
  return (
    <section>
      <ul className="stay-list">
        {stays.map((stay) => (
          <li key={stay._id}>
            <Link to={`/stay/${stay._id}`}>
              <StayPreview stay={stay} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
