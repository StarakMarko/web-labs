import Header from './Header/Header.jsx'
import Hero from './Hero/Hero.jsx'
import Card from './Card/Card.jsx'
import Button from './Button/Button.jsx'
import Footer from './Footer/Footer.jsx'

function App() {
  return (
    <>
      <Header></Header>
      <Hero />
      <Card name="Ivan Franko Park" address="Universytetska St, 1" length_of_bicycle_path={30} price={5} />
      <Card name="Stryiskyi Park" address="Parkova St" length_of_bicycle_path={10} price={15} />
      <Card name="Culture Park" address="4 Bolharska St" length_of_bicycle_path={3} price={2} />
      <Button />
      <Footer />
    </>
  );
}

export default App
