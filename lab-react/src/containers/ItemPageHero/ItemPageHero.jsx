import { useState } from 'react';
import { usePark } from '../context/ParkContext.jsx';
import { useNavigate } from 'react-router-dom';
import styles from './ItemPageHero.module.css';

function ItemPageHero() {
  const { selectedPark: park } = usePark();
  const navigate = useNavigate();
  const [activeCharacteristic, setActiveCharacteristic] = useState(1);

  if (!park) return <p>Park not found</p>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.itemContainer}>
        <img
          className={styles.itemImg}
          src={park.imageUrl || "https://www.britainexpress.com/images/attractions/editor3/Green-Park-2349.jpg"}
          alt={park.name}
        />

        <div className={styles.itemOverlay}>
          <div className={styles.characteristics}>
            <span
              className={`${styles.characteristic} ${activeCharacteristic === 1 ? styles.active : ''}`}
              onClick={() => setActiveCharacteristic(1)}
            >
              1 characteristic
            </span>
            <span
              className={`${styles.characteristic} ${activeCharacteristic === 2 ? styles.active : ''}`}
              onClick={() => setActiveCharacteristic(2)}
            >
              2 characteristic
            </span>
          </div>

          <h1>{park.name}</h1>
          <p>{park.description}</p>

          {activeCharacteristic === 2 && (
            <div className={styles.extraInfo}>
              <p><strong>Bike path length:</strong> {park.length_of_bicycle_path || '—'} km</p>
              <p><strong>Address:</strong> {park.address || '—'}</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.priceTag}><strong>Price:</strong> ${park.price}</p>
        <div className={styles.actionButtons}>
          <button className={styles.goBackBtn} onClick={() => navigate(-1)}>Go back</button>
          <button className={styles.addToCartBtn}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default ItemPageHero;
