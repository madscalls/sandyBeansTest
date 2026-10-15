const pad = (n) => String(n).padStart(2, '0')

export const toDate = (d, t) => {
  const [y, m, da] = d.split('-').map(Number)
  const [h, mi] = t.split(':').map(Number)
  return new Date(y, m - 1, da, h, mi)
}

export const fmtTime = (dt) =>
  dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).replace(':00', '').replace(' ', ' ')

export const sameDay = (a, b) => a.toDateString() === b.toDateString()

const gStamp = (dt) =>
  `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`

export const mapsUrl = (address) =>
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address)

export const calUrl = (stop) =>
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=' + encodeURIComponent('Sandy Beans Coffee: ' + stop.place) +
  '&dates=' + gStamp(stop.s) + '/' + gStamp(stop.e) + '&ctz=America/New_York' +
  '&location=' + encodeURIComponent(stop.address) +
  '&details=' + encodeURIComponent('Find the pink coffee trailer! Updates on Instagram @sandybeanscoffeellc')

/** Upcoming stops (ending after `now`), sorted, with real Date objects attached as s / e. */
export function upcomingStops(stops, now = new Date()) {
  return stops
    .map((x) => ({ ...x, s: toDate(x.date, x.start), e: toDate(x.date, x.end) }))
    .filter((x) => x.e > now)
    .sort((a, b) => a.s - b.s)
}
