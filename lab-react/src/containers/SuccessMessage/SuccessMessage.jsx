import styles from "./SuccessMessage.module.css";
import { Link } from 'react-router-dom';

export default function SuccessMessage() {
    return (
        <div className={styles.container}>
            <div className={styles.iconWrapper}>
                <div className={styles.checkmark}>✓</div>
            </div>

            <h2 className={styles.title}>Success!</h2>

            <p className={styles.text}>Your order was sent to processing!</p>
            <p className={styles.text}>Check your email box for further information.</p>

            <Link to="/catalog" className={styles.button}>Go back to Catalog</Link>
        </div>
    );
}
