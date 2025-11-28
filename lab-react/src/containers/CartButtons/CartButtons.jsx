import styles from './CartButtons.module.css'
import { Link } from 'react-router-dom'

function CartButtons() {
    return <div className={styles.cartButtons}>
        <Link to="/catalog" className={styles.goBackBtn}>
            Back to catalog
        </Link>
        <Link to="/checkout" className={styles.ContinueBtn}>
            Continue
        </Link>
    </div>;
}


export default CartButtons;