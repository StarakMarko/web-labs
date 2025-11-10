import styles from './Header.module.css'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

function Header({ searchQuery, setSearchQuery }) {
    const location = useLocation();
    const isCatalogPage = location.pathname === '/catalog';

    return (
        <header className={styles.header}>
            <section className={styles.header__section}>
                <img src="../src/assets/park-svgrepo-com.svg" alt="logo" className={styles.logo} />
                <nav>
                    <ul className={styles.nav__list}>

                        <li >
                            <NavLink to="/" className={({ isActive }) =>
                                isActive ? `${styles.nav__link} ${styles.active}` : styles.nav__link}>
                                Home
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/catalog" className={({ isActive }) =>
                                isActive ? `${styles.nav__link} ${styles.active}` : styles.nav__link}>
                                Catalog
                            </NavLink>
                        </li>
                        <li >
                            <NavLink to="/cart" className={({ isActive }) =>
                                isActive ? `${styles.nav__link} ${styles.active}` : styles.nav__link}>
                                Cart
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {isCatalogPage && (
                    <div className={styles.searchContainer}>
                        <input type="text" placeholder="" value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value.trimStart())}
                            className={styles.searchInput}
                        />
                        <img src="../src/assets/search.png" alt="Search" className={styles.searchIcon} />
                    </div>
                )}
            </section>
            <hr></hr>
        </header>
    )
}

export default Header