export default function EventCard({ event, onView }) {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.name} className="event-img" />
      <div className="event-info">
        <h3>{event.name}</h3>
        <p>{new Date(event.date).toLocaleDateString()}</p>
        <button onClick={() => onView(event)}>View Event</button>
      </div>
    </div>
  )
}
