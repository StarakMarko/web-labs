import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import ErrorMessage from "../../containers/ErrorMessage/ErrorMessage.jsx";

const LoginPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("userEmail")) {
            navigate("/");
        }
    }, [navigate]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email("Invalid email address")
                .required("Email is required"),
            password: yup
                .string()
                .required("Password is required"),
        }),
        onSubmit: (values, { setFieldError, setStatus }) => {

            const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

            const foundUser = registeredUsers.find(
                (user) => user.email === values.email && user.password === values.password
            );

            if (foundUser) {
                console.log("Login successful");
                localStorage.setItem("userEmail", foundUser.email);
                navigate("/");
            } else {
                setFieldError("password", "Incorrect email or password");

            }
        },
    });

    const handleAutoFill = () => {
        formik.setValues({
            email: "test@example.com",
            password: "123456"
        });
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                <h2>Submit the form to sign in</h2>

                <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={handleAutoFill}
                >Auto Fill (Test Data)
                </button>

                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.formGroup}>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="E-mail"
                            className={styles.formInput}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            className={styles.formInput}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                    </div>

                    <ErrorMessage
                        errors={Object.keys(formik.errors)
                            .filter((key) => formik.touched[key])
                            .map((key) => formik.errors[key])}
                    />

                    <div className={styles.authFooter}>
                        Not a member?{" "}
                        <Link to="/signup" className={styles.authLink}>
                            Sign up
                        </Link>
                    </div>

                    <button type="submit" className={styles.authButton}>
                        LOGIN ME
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;