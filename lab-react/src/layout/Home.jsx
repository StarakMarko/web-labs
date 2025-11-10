import { useState } from "react";
import Hero from "../containers/Hero/Hero.jsx";
import Card, { CardContext } from "../components/Card/Card.jsx";
import Button from "../containers/Button/Button.jsx";

function Home({ parks }) {
    const [showAll, setShowAll] = useState(false);

    const displayedParks = showAll ? parks : parks.slice(0, 3)
    const buttonText = showAll ? "View less" : "View more";

    return (
        <>
            <Hero />
            {displayedParks.map((park) => (
                <CardContext.Provider key={park.name} value={park}>
                    <Card />
                </CardContext.Provider>
            ))}
            <Button onClick={() => setShowAll(!showAll)} text={buttonText} />
        </>
    );
}

export default Home;