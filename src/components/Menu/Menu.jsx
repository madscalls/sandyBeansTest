import { MENU, SHOW_SAMPLE_BANNER } from '../../data/menu.js'
import './Menu.css'

export default function Menu() {
  return (
    <section id="menu" className="menu">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <span className="eyebrow">What's pouring</span>
            <h2>the menu.</h2>
            <p>Specialty lattes, matcha and dirty sodas, made to order. Ask about seasonal specials at the window.</p>
          </div>
        </div>

        {SHOW_SAMPLE_BANNER && <div className="sample-note">Preview: sample drinks and prices.</div>}

        <div className="menu__grid">
          {MENU.map((c) => (
            <article key={c.title} className={`board board--${c.color}`}>
              <div className="board__head">
                <h3>{c.title}</h3>
                <p>{c.sub}</p>
              </div>
              <ul>
                {c.items.map((i) => (
                  <li key={i.name}>
                    <span className="board__name">{i.name}{i.tag && <span className="pill">{i.tag}</span>}</span>
                    {i.price && <span className="board__price">{i.price}</span>}
                    {i.desc && <span className="board__desc">{i.desc}</span>}
                  </li>
                ))}
              </ul>
              {c.addons && <div className="board__addons">{c.addons}</div>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
