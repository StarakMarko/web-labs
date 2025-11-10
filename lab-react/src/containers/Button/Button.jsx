import styles from './Button.module.css'

function Button({ onClick, text }) {
    return (
        <div>
            <button onClick={onClick} className={styles.button}>{text}</button>
        </div>
    )
}

export default Button