import styles from './Header.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <section className={styles.header__section}>
                <img src="../src/assets/park-svgrepo-com.svg" alt="logo" className={styles.logo} />
                <nav>
                    <ul className={styles.nav__list}>
                        <li className={styles.nav__link}><a href="">Home</a></li>
                        <li className={styles.nav__link}><a href="">Catalog</a></li>
                        <li className={styles.nav__link}><a href="">Cart</a></li>
                    </ul>
                </nav>
            </section>
            <hr></hr>
        </header>
    )
}

export default Header