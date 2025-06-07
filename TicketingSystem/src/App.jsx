import { useState } from 'react'
import './App.css'
import { events } from './data/events.js'
import EventList from './components/EventList.jsx'
import EventDetails from './components/EventDetails.jsx'
import Cart from './components/Cart.jsx'

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const addToCart = (eventId, type, qty) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.eventId === eventId && i.type === type
      )
      if (idx !== -1) {
        const updated = [...prev]
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + qty }
        return updated
      }
      return [...prev, { eventId, type, qty }]
    })
    setShowCart(true)
  }

  const updateCart = (eventId, type, qty) => {
    setCart((prev) =>
      prev.map((i) =>
        i.eventId === eventId && i.type === type ? { ...i, qty } : i
      )
    )
  }

  return (
    <div className="app">
      <h1>Sports Events</h1>
      {showCart ? (
        <Cart
          cart={cart}
          events={events}
          onUpdate={updateCart}
          onClose={() => setShowCart(false)}
        />
      ) : selectedEvent ? (
        <EventDetails
          event={selectedEvent}
          onAdd={addToCart}
          onBack={() => setSelectedEvent(null)}
        />
      ) : (
        <EventList events={events} onView={setSelectedEvent} />
      )}
      <button className="view-cart-btn" onClick={() => setShowCart(true)}>
        Cart ({cart.reduce((a, b) => a + b.qty, 0)})
      </button>
    </div>
  )
}

export default App
