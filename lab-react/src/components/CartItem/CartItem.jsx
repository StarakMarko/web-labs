import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../state/actions";
import styles from "./CartItem.module.css";
import { Link } from "react-router-dom";

function CartItem({ product }) {
  const dispatch = useDispatch();
  const quantity = product.quantity || 1;

  const handleDecrease = () => {
    dispatch(removeFromCart(product.id, 1));
  };

  const handleIncrease = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className={styles.card}>
      <div className={styles.productInfo}>
        <div className={styles.imagePlaceholder}>
          <img
            src={product.imageUrl || "../src/assets/park-svgrepo-com.svg"}
            alt={product.name}
            className={styles.icon}
          />
        </div>
        <Link to={`/item/${product.id.split("/")[0]}`}><h3 className={styles.title}>{product.name}</h3></Link>
      </div>

      <div className={styles.actions}>
        <div className={styles.quantityControl}>
          <button
            className={styles.button}
            onClick={handleDecrease}
            aria-label="Decrease quantity"
          >
            -
          </button>

          <span className={styles.quantity}>{quantity}</span>

          <button
            className={styles.button}
            onClick={handleIncrease}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className={styles.price}>${product.price * quantity}</div>
      </div>
    </div>
  );
}

export default CartItem;
