import { useState } from 'react'
import './App.css'

function App() {
  const [tickets, setTickets] = useState([])
  const [form, setForm] = useState({ event: '', price: '', seller: '' })

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const listTicket = (e) => {
    e.preventDefault()
    if (!form.event || !form.price || !form.seller) return
    const newTicket = {
      id: Date.now(),
      event: form.event,
      price: Number(form.price),
      seller: form.seller,
      sold: false,
    }
    setTickets([...tickets, newTicket])
    setForm({ event: '', price: '', seller: '' })
  }

  const buyTicket = (id) => {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, sold: true } : t)))
  }

  return (
    <div className="app">
      <h1>Sports Ticketing</h1>

      <form onSubmit={listTicket} className="sell-form">
        <input
          name="event"
          placeholder="Event"
          value={form.event}
          onChange={handleFormChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleFormChange}
        />
        <input
          name="seller"
          placeholder="Seller"
          value={form.seller}
          onChange={handleFormChange}
        />
        <button type="submit">Sell Ticket</button>
      </form>

      <h2>Available Tickets</h2>
      <ul className="ticket-list">
        {tickets.filter((t) => !t.sold).length === 0 && (
          <li>No tickets available</li>
        )}
        {tickets
          .filter((t) => !t.sold)
          .map((t) => (
            <li key={t.id}>
              {t.event} - ${t.price} (Seller: {t.seller})
              <button onClick={() => buyTicket(t.id)}>Buy</button>
            </li>
          ))}
      </ul>

      <h2>Sold Tickets</h2>
      <ul className="ticket-list">
        {tickets.filter((t) => t.sold).length === 0 && <li>No sold tickets</li>}
        {tickets
          .filter((t) => t.sold)
          .map((t) => (
            <li key={t.id}>
              {t.event} - ${t.price} (Seller: {t.seller})
            </li>
          ))}
      </ul>
    </div>
  )
}

export default App
