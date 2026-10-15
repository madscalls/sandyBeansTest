/*
  THE SCHEDULE: edit this list every week.
  One line per stop. Past stops hide themselves automatically.

  date:    "YYYY-MM-DD"
  start:   "HH:MM" in 24-hour time (Eastern)
  end:     "HH:MM" in 24-hour time
  place:   name shown on the card
  address: what Google Maps searches for
  note:    optional, small pink line under the address
  cause:   optional, true gives the stop the featured pink look
  tagline: optional, a sentence shown under the address
  sample:  optional, true adds a "sample" tag to the stop
*/
export const SHOW_SAMPLE_BANNER = false

export const STOPS = [
  { date: '2026-10-12', start: '07:30', end: '12:00', place: 'North Port City Hall', address: '4970 City Hall Blvd, North Port, FL 34286' },
  { date: '2026-10-17', start: '08:00', end: '15:00', place: 'Ann & Chuck Dever Regional Park', address: '6791 San Casa Dr, Englewood, FL 34224', note: 'Open to the public · or until sold out' },
  {
    date: '2026-10-18', start: '09:00', end: '14:00', place: 'coffee for a cause.', address: "Lowe's, North Port, FL", cause: true,
    tagline: '9 AM – 2 PM or until sold out. Proceeds after supply costs help a local mom and her children.',
  },
]
