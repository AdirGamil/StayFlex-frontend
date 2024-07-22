export function StayOrders() {
  return (
    <div className="stay-orders-container">
      <h1>Orders</h1>
      <table className="stay-orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Guest</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12345</td>
            <td>John Doe</td>
            <td>2023-07-01</td>
            <td>2023-07-10</td>
            <td>$1500</td>
            <td>pending</td>
            <td>
              <button className="btn btn-accept">Accept</button>
              <button className="btn btn-reject">Reject</button>
            </td>
          </tr>
          <tr>
            <td>12346</td>
            <td>Jane Smith</td>
            <td>2023-08-15</td>
            <td>2023-08-20</td>
            <td>$2000</td>
            <td>confirmed</td>
            <td>
              <button className="btn btn-accept">Accept</button>
              <button className="btn btn-reject">Reject</button>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>12347</td>
            <td>Alice Johnson</td>
            <td>2023-09-01</td>
            <td>2023-09-10</td>
            <td>$1800</td>
            <td>pending</td>
            <td>
              <button className="btn btn-accept">Accept</button>
              <button className="btn btn-reject">Reject</button>
            </td>
          </tr>
          <tr>
            <td>12348</td>
            <td>Bob Brown</td>
            <td>2023-10-15</td>
            <td>2023-10-20</td>
            <td>$2200</td>
            <td>confirmed</td>
            <td>
              <button className="btn btn-accept">Accept</button>
              <button className="btn btn-reject">Reject</button>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>12349</td>
            <td>Chris Green</td>
            <td>2023-11-01</td>
            <td>2023-11-10</td>
            <td>$2500</td>
            <td>pending</td>
            <td>
              <button className="btn btn-accept">Accept</button>
              <button className="btn btn-reject">Reject</button>
            </td>
          </tr>
          <tr>
            <td>12350</td>
            <td>Diana White</td>
            <td>2023-12-15</td>
            <td>2023-12-20</td>
            <td>$3000</td>
            <td>confirmed</td>
            <td>
              <button className="btn btn-accept">Accept</button>
              <button className="btn btn-reject">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
