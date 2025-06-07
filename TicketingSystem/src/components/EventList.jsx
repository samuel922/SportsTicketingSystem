import EventCard from './EventCard.jsx'

export default function EventList({ events, onView }) {
  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onView={onView} />
      ))}
    </div>
  )
}
