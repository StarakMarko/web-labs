import { useState, useEffect } from "react";
import Hero from "../containers/Hero/Hero.jsx";
import Card, { CardContext } from "../components/Card/Card.jsx";
import Button from "../containers/Button/Button.jsx";

function Home({ parks }) {
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(true); // стан завантаження

    // Вмикаємо/вимикаємо лоадер, коли parks змінюються
    useEffect(() => {
        if (parks && parks.length > 0) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [parks]);

    const displayedParks = showAll ? parks : parks.slice(0, 3);
    const buttonText = showAll ? "View less" : "View more";

    if (loading) {
        return (
            <>
                <Hero />
                <div className="loader"></div>
            </>
        );
    }

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
