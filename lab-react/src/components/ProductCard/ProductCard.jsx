import { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

// Експортуємо контекст
export const ProductCardContext = createContext();

function ProductCard() {
    const [isExpanded, setIsExpanded] = useState(false);
    const park = useContext(ProductCardContext);
    const navigate = useNavigate();

    const handleToggleDetails = () => {
        navigate(`/item/${encodeURIComponent(park.name)}`);
    };

    return (
        <div className={styles.card}>
            <img
                src={park.imageUrl || "https://www.britainexpress.com/images/attractions/editor3/Green-Park-2349.jpg"}
                alt={park.name}
                className={styles.card__img}
            />
            <h5 className={styles.card__title}>{park.name}</h5>
            <p className={styles.card__description}>{park.description}</p>
            <div className={styles.card__price_block}>
                <strong>Price:</strong>
                <span className={styles.card__price}>$ {park.price}</span>
            </div>

            <button className={styles.card__button} onClick={handleToggleDetails}>
                View more
            </button>
        </div>
    );
}

export default ProductCard;
