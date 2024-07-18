import { userService } from '../services/user'
import { StayPreview } from './StayPreview'

export function StayList({ stays }) {
  console.log('stays:', stays)
  return (
    <section>
      <ul className="list">
        {stays.map((stay) => (
          <li key={stay._id}>
            <StayPreview stay={stay} />
            {/* {shouldShowActionBtns(stay) && (
              <div className="actions">
                <button onClick={() => onUpdateCar(stay)}>Edit</button>
                <button onClick={() => onRemoveCar(stay._id)}>x</button>
              </div>
            )} */}
          </li>
        ))}
      </ul>
    </section>
  )
}
