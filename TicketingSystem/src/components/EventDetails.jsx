import React from "react"
export default function EventDetails({ event, onAdd, onBack }) {
  const now = new Date()
  const past = new Date(event.date) < now
  const [type, setType] = React.useState('adult')
  const [qty, setQty] = React.useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(event.id, type, qty)
    setQty(1)
  }

  return (
    <div className="event-details">
      <button onClick={onBack}>Back to Events</button>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>
        Date: {new Date(event.date).toLocaleDateString()} -{' '}
        {past ? 'Event Passed' : 'Upcoming'}
      </p>
      {!past && (
        <form onSubmit={handleSubmit} className="add-cart-form">
          <label>
            Type:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {Object.keys(event.prices).map((p) => (
                <option key={p} value={p}>
                  {p} (${event.prices[p]})
                </option>
              ))}
            </select>
          </label>
          <label>
            Qty:
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </label>
          <button type="submit">Add to Cart</button>
        </form>
      )}
    </div>
  )
}
