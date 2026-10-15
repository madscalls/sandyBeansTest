import Hero from './components/Hero/Hero.jsx'
import ScallopBows from './components/ScallopBows/ScallopBows.jsx'
import Schedule from './components/Schedule/Schedule.jsx'
import Menu from './components/Menu/Menu.jsx'
import Social from './components/Social/Social.jsx'
import KindnessBand from './components/KindnessBand/KindnessBand.jsx'
import Footer from './components/Footer/Footer.jsx'

export default function App() {
  return (
    <>
      <Hero />
      <ScallopBows />
      <main>
        <Schedule />
        <Menu />
        <Social />
        <KindnessBand />
      </main>
      <Footer />
    </>
  )
}
