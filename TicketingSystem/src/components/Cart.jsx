export default function Cart({ cart, events, onUpdate, onClose }) {
  const total = cart.reduce((sum, item) => {
    const event = events.find((e) => e.id === item.eventId)
    const price = event.prices[item.type]
    return sum + price * item.qty
  }, 0)

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cart.length === 0 && <p>No items in cart.</p>}
      {cart.map((item) => {
        const event = events.find((e) => e.id === item.eventId)
        return (
          <div key={`${item.eventId}-${item.type}`} className="cart-item">
            <span>
              {event.name} - {item.type} (${event.prices[item.type]})
            </span>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) =>
                onUpdate(item.eventId, item.type, Number(e.target.value))
              }
            />
          </div>
        )
      })}
      <p className="cart-total">Total: ${total}</p>
      <button onClick={onClose}>Close</button>
    </div>
  )
}
