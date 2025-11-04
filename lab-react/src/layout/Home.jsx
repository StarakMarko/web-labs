import Hero from "../containers/Hero/Hero.jsx";
import Card from "../components/Card/Card.jsx";
import Button from "../containers/Button/Button.jsx";


function Home({ parks }) {
    const featuredParks = parks.slice(0, 3);
    return (
        <>
            <Hero />
            {featuredParks.map((park) => (
                <Card
                    key={park.name}
                    name={park.name}
                    address={park.address}
                    length_of_bicycle_path={park.length_of_bicycle_path}
                    price={park.price}
                />
            ))}
            <Button />
        </>
    );
}

export default Home;