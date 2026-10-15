import { STOPS } from '../../data/stops.js'
import { upcomingStops, fmtTime, sameDay, mapsUrl, calUrl } from '../../utils/schedule.js'
import { PinIcon, CalendarIcon } from '../Icons/Icons.jsx'
import './NextStop.css'

export default function NextStop() {
  const now = new Date()
  const next = upcomingStops(STOPS, now)[0]

  if (!next) {
    return (
      <div className="next" aria-live="polite">
        <span className="status">No stops posted yet</span>
        <h3>Check back soon</h3>
        <p className="next__addr">New dates go up on Instagram and Facebook first.</p>
      </div>
    )
  }

  const live = next.s <= now && now < next.e
  const tomorrow = new Date(now)
  tomorrow.setDate(now.getDate() + 1)
  const dayLabel = sameDay(next.s, now)
    ? 'Today'
    : sameDay(next.s, tomorrow)
      ? 'Tomorrow'
      : next.s.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })

  return (
    <div className="next" aria-live="polite">
      <div className="next__top">
        <span className={`status${live ? ' status--live' : ''}`}>{live ? 'Open now' : 'Next stop'}</span>
        <span className="eyebrow">{dayLabel}</span>
      </div>
      <h3>{next.place}</h3>
      <div className="next__when">
        {live ? `Serving until ${fmtTime(next.e)}` : `${fmtTime(next.s)} – ${fmtTime(next.e)}`}
      </div>
      <div className="next__addr">{next.address}</div>
      <div className="next__actions">
        <a className="btn pink" href={mapsUrl(next.address)} target="_blank" rel="noopener noreferrer"><PinIcon /> Directions</a>
        <a className="btn ghost" href={calUrl(next)} target="_blank" rel="noopener noreferrer"><CalendarIcon /> Save the date</a>
      </div>
    </div>
  )
}
