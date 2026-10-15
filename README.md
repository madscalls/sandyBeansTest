# Sandy Beans Coffee

One-page site for Sandy Beans Coffee, a pink coffee trailer popping up around North Port, Venice, Sarasota and Englewood. Built with React + Vite.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Updating content (no component code needed)

| What | File |
| --- | --- |
| Weekly pop-up stops | `src/data/stops.js` |
| Menu drinks | `src/data/menu.js` |
| Instagram / Facebook / TikTok links | `src/data/links.js` |

Past stops hide themselves automatically. The "Next stop" card at the top always shows the next upcoming stop, and switches to "Open now" while she's serving.

## Structure

```
src/
  App.jsx                 page order
  styles/global.css       colors, fonts, shared bits (.wrap, .btn, .label, .pill ...)
  data/                   stops, menu, links
  utils/schedule.js       date helpers, Google Maps + Google Calendar links
  assets/logo.webp        her logo (circle crop)
  components/
    Hero/                 top section: logo, truck, tagline, next stop
    Logo/                 pops in on load, jiggles when tapped
    Truck/                drives in from the left, zooms off right when tapped
    ShellBurst/           canvas of teal shells radiating from behind the logo
    NextStop/             "Next stop" / "Open now" card
    ScallopBows/          scalloped edge with satin bows
    Schedule/             list of stops with 7-day / all filter
    Menu/                 menu boards
    Social/               TikTok / Instagram / Facebook tiles + booking banner
    KindnessBand/         "be kind. always."
    Footer/
    Icons/                shared SVG icons
```

Each component folder holds its `.jsx` and its own `.css`.

## Open items

- TikTok link is a search placeholder (`src/data/links.js`) until we have her handle.
- No prices on the menu (she doesn't post them).
- Decide with her how weekly stops get updated (edit `stops.js`, a Google Sheet, or a form).
