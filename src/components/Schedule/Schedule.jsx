import { useState } from 'react'
import { STOPS, SHOW_SAMPLE_BANNER } from '../../data/stops.js'
import { upcomingStops, fmtTime, sameDay, mapsUrl, calUrl } from '../../utils/schedule.js'
import { PinIcon, CalendarIcon } from '../Icons/Icons.jsx'
import './Schedule.css'

const FILTER_KEY = 'sb-filter'
const readFilter = () => { try { return localStorage.getItem(FILTER_KEY) || 'week' } catch { return 'week' } }

export default function Schedule() {
  const [filter, setFilter] = useState(readFilter)
  const now = new Date()
  const stops = upcomingStops(STOPS, now)
  const weekOut = new Date(now)
  weekOut.setDate(now.getDate() + 7)
  const rows = filter === 'week' ? stops.filter((s) => s.s < weekOut) : stops

  const choose = (f) => {
    setFilter(f)
    try { localStorage.setItem(FILTER_KEY, f) } catch { /* storage unavailable */ }
  }

  return (
    <section id="schedule" className="schedule">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">Where's the truck?</span>
            <h2>find us this week.</h2>
            <p>Every stop, with hours and directions. Tap the calendar button to save one to your phone.</p>
          </div>
          <div className="schedule__filters" role="group" aria-label="Filter stops">
            <button className="chip" aria-pressed={filter === 'week'} onClick={() => choose('week')}>Next 7 days</button>
            <button className="chip" aria-pressed={filter === 'all'} onClick={() => choose('all')}>All upcoming</button>
          </div>
        </div>

        {SHOW_SAMPLE_BANNER && <div className="sample-note">Preview: stops marked “sample” are placeholders.</div>}

        <ul className="schedule__list">
          {rows.length === 0 && (
            <li className="schedule__empty">Nothing posted for the next 7 days yet. Try “All upcoming” or check Instagram.</li>
          )}
          {rows.map((s) => {
            const today = sameDay(s.s, now)
            const cls = ['ev', today && 'ev--today', s.cause && 'ev--cause'].filter(Boolean).join(' ')
            return (
              <li key={s.date + s.start + s.place} className={cls}>
                <div className="ev__date">
                  <div className="ev__dow">{today ? 'Today' : s.s.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div className="ev__d">{s.s.getDate()}</div>
                  <div className="ev__m">{s.s.toLocaleDateString('en-US', { month: 'short' })}</div>
                </div>
                <div className="ev__body">
                  <h3>{s.place}{s.sample && <span className="pill">sample</span>}</h3>
                  <div className="ev__meta"><b>{fmtTime(s.s)} – {fmtTime(s.e)}</b> · {s.address}</div>
                  {s.tagline && <span className="ev__tagline">{s.tagline}</span>}
                  {s.note && <span className="ev__note">{s.note}</span>}
                </div>
                <div className="ev__actions">
                  <a className="icon-btn" href={mapsUrl(s.address)} target="_blank" rel="noopener noreferrer" aria-label={`Directions to ${s.place}`} title="Directions"><PinIcon /></a>
                  <a className="icon-btn" href={calUrl(s)} target="_blank" rel="noopener noreferrer" aria-label={`Add ${s.place} to Google Calendar`} title="Add to calendar"><CalendarIcon /></a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
