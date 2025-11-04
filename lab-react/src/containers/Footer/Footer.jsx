import styles from './Footer.module.css'

function Footer() {
    return (
        <><hr className={styles.footer__hr} />
            <footer>
                <div className={styles.section__footer}>
                    <section className={styles.text__section}>
                        <h5 className={styles.footer__titel}>Parks</h5>
                        <p>Park design is influenced by the intended purpose and audience, as well as by the available land features.</p>
                    </section>
                    <img src="../src/assets/park-svgrepo-com.svg" alt="logo" className={styles.logo} />
                    <section className={styles.section__social}>
                        <img src="../src/assets/facebook.png" alt="social logo" className={styles.social__logo} />
                        <img src="../src/assets/linkedin.png" alt="social logo" className={styles.social__logo} />
                        <img src="../src/assets/twitter.png" alt="social logo" className={styles.social__logo} />
                        <img src="../src/assets/youtube.png" alt="social logo" className={styles.social__logo} />
                    </section>
                </div>
                <hr />
                <p>© 2025 Copyright all rights reserved, bla bla</p>
            </footer>
        </>
    )
}

export default Footer