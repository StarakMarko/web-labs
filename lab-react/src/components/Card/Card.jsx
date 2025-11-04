import styles from './Card.module.css'

function Cart(props) {
    return (
        <div className={styles.card}>
            <img src="https://www.britainexpress.com/images/attractions/editor3/Green-Park-2349.jpg" alt="card img" className={styles.card__img} />
            <h5 class={styles.card__name}>{props.name}</h5>
            <p class={styles.card__address}>Address: {props.address}</p>
            <p class={styles.card__length_of_bicycle_path}>length of bike paths: {props.length_of_bicycle_path} km</p>
            <p class={styles.card__price}>ticket price: {props.price} $</p>
        </div>
    )
}

export default Cart