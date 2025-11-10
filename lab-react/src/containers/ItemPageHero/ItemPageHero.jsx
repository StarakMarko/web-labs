import { useState } from 'react';
import styles from './ItemPageHero.module.css';
import { useParams, useNavigate } from 'react-router-dom';

function ItemPageHero({ parks }) {
  const { name } = useParams();
  const navigate = useNavigate();
  const [activeCharacteristic, setActiveCharacteristic] = useState(1);

  const park = parks.find(p => p.name === decodeURIComponent(name));
  if (!park) return <p>Park not found</p>;

  return (
    <div className={styles.page__wrapper}>
      <div className={styles.item__container}>
        <img
          className={styles.item__img}
          src={park.imageUrl || "https://www.britainexpress.com/images/attractions/editor3/Green-Park-2349.jpg"}
          alt={park.name}
        />

        <div className={styles.item__overlay}>
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
            <div className={styles.extra_info}>
              <p><strong>Bike path length:</strong> {park.length_of_bicycle_path || '—'} km</p>
              <p><strong>Address:</strong> {park.address || '—'}</p>
            </div>
          )}

          <div className={styles.form__fields}>
            <div className={styles.field__group}>
              <label htmlFor="countable">Countable field</label>
              <input id="countable" type="number" placeholder="0..." />
            </div>
            <div className={styles.field__group}>
              <label htmlFor="selectable">Selectable Field</label>
              <select id="selectable">
                <option value="">Select</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom__bar}>
        <p className={styles.price_tag}><strong>Price:</strong> ${park.price}</p>

        <div className={styles.action__buttons}>
          <button
            className={styles.go_back_btn}
            onClick={() => navigate(-1)}
          >
            Go back
          </button>
          <button className={styles.add_to_cart_btn}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemPageHero;
