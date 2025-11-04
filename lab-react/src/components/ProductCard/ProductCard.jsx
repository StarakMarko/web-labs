import { useState } from 'react';
import styles from './ProductCard.module.css';

function ProductCard(props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleDetails = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.card}>
            <img
                src={props.imageUrl || "https://www.britainexpress.com/images/attractions/editor3/Green-Park-2349.jpg"}
                alt={props.name}
                className={styles.card__img}
            />
            <h5 className={styles.card__title}>{props.name}</h5>
            <p className={styles.card__description}>{props.description}</p>
            <div className={styles.card__price_block}>
                <strong>Price:</strong>
                <span className={styles.card__price}>$ {props.price}</span>
            </div>

            {isExpanded && (
                <div className={styles.card__details}>
                    <p><strong>Address:</strong> {props.address}</p>
                    <p><strong>length of bike paths:</strong> {props.length_of_bicycle_path} km</p>
                </div>
            )}

            <button className={styles.card__button} onClick={handleToggleDetails}>
                {isExpanded ? 'Hide' : 'View more'}
            </button>
        </div>
    );
}

export default ProductCard;