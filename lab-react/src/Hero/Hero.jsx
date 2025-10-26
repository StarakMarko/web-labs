import styles from './Hero.module.css'

function Hero() {
    return (
        <section className={styles.hero__sestion}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Halleyparknovember_b.jpg/500px-Halleyparknovember_b.jpg" alt="park img" className={styles.hero__img} />
            <section className={styles.hero__text}>
                <h2>Park</h2>
                <p>A park is an area of natural, semi-natural or planted space set aside for human enjoyment and recreation or for the protection of wildlife or natural habitats.</p>
            </section>

        </section>
    )
}

export default Hero