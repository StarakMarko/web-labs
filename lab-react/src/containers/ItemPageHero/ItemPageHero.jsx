import { useState, useEffect } from 'react';
import { usePark } from '../context/ParkContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../state/actions';
import { fetchParkById } from '../../utils/api.js';
import styles from './ItemPageHero.module.css';

function ItemPageHero() {
  const { selectedPark: park, setSelectedPark } = usePark();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [activeCharacteristic, setActiveCharacteristic] = useState(1);
  const [countValue, setCountValue] = useState(1);
  const [selectValue, setSelectValue] = useState('Standart');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!park && id) {
      setLoading(true);
      fetchParkById(id)
        .then((fetchedPark) => {
          setSelectedPark(fetchedPark);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching park:', err);
          setLoading(false);
        });
    }
  }, [id, park, setSelectedPark]);

  if (loading || !park) return <p>Loading...</p>;

  const currentPrice = selectValue === 'VIP' ? park.price * 2 : park.price;

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

          <div className={styles.formFields}>
            <div className={styles.fieldGroup}>
              <label htmlFor="countableInput">Countable field</label>
              <input
                type="number"
                id="countableInput"
                min="1"
                step="1"
                value={countValue}
                onChange={(e) => setCountValue(Number(e.target.value))}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="selectableInput">Selectable Field</label>
              <select
                id="selectableInput"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
              >
                <option value="Standart" >Standart</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.priceTag}><strong>Price:</strong> ${currentPrice * countValue}</p>
        <div className={styles.actionButtons}>
          <button className={styles.goBackBtn} onClick={() => navigate(-1)}>Go back</button>
          <button
            className={styles.addToCartBtn}
            onClick={() => {
              const item = {
                id: `${park.id}/${selectValue}`,
                name: `${park.name} / ${selectValue}`,
                price: currentPrice,
                imageUrl: park.imageUrl,
                options: { variant: selectValue },
                quantity: Number(countValue) || 1,
              };

              dispatch(addToCart(item));
              navigate('/cart');
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemPageHero;