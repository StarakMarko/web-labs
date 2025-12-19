import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import ErrorMessage from "../../containers/ErrorMessage/ErrorMessage.jsx"

const SignUpPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("userEmail")) {
            navigate("/");
        }
    }, [navigate]);

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            retypePassword: "",
        },
        validationSchema: yup.object({
            username: yup
                .string()
                .min(2, "Username must be at least 2 characters")
                .required("Username is required"),
            email: yup
                .string()
                .email("Invalid email address")
                .required("Email is required"),
            password: yup
                .string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
            retypePassword: yup
                .string()
                .oneOf([yup.ref("password"), null], "Passwords must match")
                .required("Please confirm your password"),
        }),
        onSubmit: (values, { setFieldError }) => {
            const existingUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

            const userExists = existingUsers.find(user => user.email === values.email);

            if (userExists) {
                setFieldError("email", "This email is already registered");
                return;
            }

            const newUser = {
                username: values.username,
                email: values.email,
                password: values.password,
            };

            existingUsers.push(newUser);
            localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

            console.log("User registered:", newUser);
            localStorage.setItem("userEmail", values.email);
            navigate("/");

        },
    });

    const handleAutoFill = () => {
        formik.setValues({
            username: "User",
            email: "test@example.com",
            password: "123456",
            retypePassword: "123456",
        });
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                <h2>Register the new account</h2>
                <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={handleAutoFill}
                >Auto Fill (Test Data)
                </button>

                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.formGroup}>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            className={styles.formInput}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                    </div>

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

                    <div className={styles.formGroup}>
                        <input
                            id="retypePassword"
                            name="retypePassword"
                            type="password"
                            placeholder="Retype password"
                            className={styles.formInput}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.retypePassword}
                        />
                    </div>

                    <ErrorMessage
                        errors={Object.keys(formik.errors)
                            .filter((key) => formik.touched[key])
                            .map((key) => formik.errors[key])}
                    />

                    <div className={styles.authFooter}>
                        Already a member?{" "}
                        <Link to="/login" className={styles.authLink}>
                            Sign in
                        </Link>
                    </div>

                    <button type="submit" className={styles.authButton}>
                        SIGN ME UP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;