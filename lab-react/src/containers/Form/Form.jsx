import styles from './Form.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../state/actions.js";

function Form() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const savedEmail = localStorage.getItem('userEmail') || '';

    const getUsers = () => {
        try {
            return JSON.parse(localStorage.getItem('registeredUsers')) || [];
        } catch {
            return [];
        }
    };

    const currentUser = getUsers().find(u => u.email === savedEmail);
    const initialName = currentUser ? currentUser.username : '';

    const formik = useFormik({
        initialValues: {
            firstName: initialName,
            lastName: '',
            email: savedEmail,
            phone: '',
            address: ''
        },
        validationSchema: yup.object({
            firstName: yup.string().min(2, "First Name must be at least 2 characters").required('First Name is required'),
            lastName: yup.string().min(2, "Last Name must be at least 2 characters").required('Last Name is required'),
            email: yup.string().email('Invalid email address').matches(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, 'Invalid email address').required('Email is required'),
            phone: yup.string().matches(/^[0-9()+-\s]+$/, "Invalid phone format").min(10, "Phone must be at least 10 characters").required('Phone is required'),
            address: yup.string().min(5, "Address must be at least 5 characters").required('Address is required')
        }),
        onSubmit: () => {
            dispatch(clearCart());
            navigate("/success");
        }

    });

    const handleAutoFill = () => {
        formik.setValues({
            firstName: initialName || 'User',
            lastName: 'User',
            email: savedEmail || 'test@example.com',
            phone: '0987654321',
            address: 'lviv, street 123'
        });
    };

    return (
        <div className={styles.container} >
            <h2 className={styles.title}>Checkout</h2>

            <button type="button" onClick={handleAutoFill} className={styles.secondaryButton}>
                Auto Fill Data
            </button>

            <form onSubmit={formik.handleSubmit} className={styles.form} id="checkoutForm">

                <div className={styles.formRow}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                        />
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.inputWrapper}>
                        <label htmlFor="address">Address</label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                        />
                    </div>
                </div>
                <ErrorMessage
                    errors={Object.keys(formik.errors)
                        .filter(key => formik.touched[key])
                        .map(key => formik.errors[key])
                    }
                />

            </form>
        </div >
    )
}

export default Form;