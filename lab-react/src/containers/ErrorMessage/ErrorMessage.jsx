import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ errors }) => {
    if (!errors || errors.length === 0) {
        return null;
    }

    return (
        <div className={styles.error_alert}>
            <h4>Oh snap! Change a few things up and try submitting again.</h4>
            <ul>
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        </div>
    );
};

export default ErrorMessage;