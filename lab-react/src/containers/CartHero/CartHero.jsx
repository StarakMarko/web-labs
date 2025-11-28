import CartItem from "../../components/CartItem/CartItem.jsx";
import { useSelector } from "react-redux";
import styles from "./CartHero.module.css";

function CartHero() {
    const cartItems = useSelector((state) => state.items);

    const totalPrice = cartItems.reduce(
        (sum, it) => sum + (Number(it.price) || 0) * (Number(it.quantity) || 0),
        0,
    );

    return (
        <>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <ul className={styles.cartList}>
                    {cartItems.map((item) => (
                        <li className={styles.cartitem} key={item.id}>
                            <CartItem product={item} />
                        </li>
                    ))}
                </ul>
            )}
            <p>
                <strong>Total price:</strong> ${totalPrice.toFixed(2)}
            </p>
        </>
    );
}

export default CartHero;