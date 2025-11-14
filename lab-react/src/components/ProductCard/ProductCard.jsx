import { usePark } from '../../containers/context/ParkContext.jsx';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

function ProductCard({ park }) {
    const { setSelectedPark } = usePark();
    const navigate = useNavigate();

    const handleToggleDetails = () => {
        setSelectedPark(park);
        navigate(`/item`);
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
                <strong>Price:</strong> <span>${park.price}</span>
            </div>

            <button className={styles.card__button} onClick={handleToggleDetails}>
                View more
            </button>
        </div>
    );
}

export default ProductCard;
