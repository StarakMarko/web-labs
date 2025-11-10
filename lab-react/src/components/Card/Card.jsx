import React, { createContext, useContext } from 'react'
import styles from './Card.module.css'

export const CardContext = createContext();

function Card() {
    const park = useContext(CardContext);
    return (
        <div className={styles.card}>
            <img
                src="https://www.britainexpress.com/images/attractions/editor3/Green-Park-2349.jpg"
                alt="card img"
                className={styles.card__img}
            />
            <h5 className={styles.card__name}>{park.name}</h5>
            <p className={styles.card__address}>Address: {park.address}</p>
            <p className={styles.card__length_of_bicycle_path}>
                length of bike paths: {park.length_of_bicycle_path} km
            </p>
            <p className={styles.card__price}>ticket price: {park.price} $</p>
        </div>
    );
}

export default Card;
