import styles from './CartButtons.module.css'
import { useNavigate, Link } from 'react-router-dom';

function CartButtons({ back_text = "Back to catalog", navigateTo = "/catalog", continueTo = "/checkout" }) {
    const navigate = useNavigate();

    return <div className={styles.cartButtons}>
        <button onClick={() => navigate(navigateTo)} className={styles.goBackBtn}>
            {back_text}
        </button>
        <button type="submit" form="checkoutForm" onClick={() => navigate(continueTo)} className={styles.ContinueBtn}>
            Continue
        </button>
    </div>;
}


export default CartButtons;