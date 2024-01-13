import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from'axios';
import { API_URL } from '../common/GlobalConstants';
const RegisterForm = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'Името трябва да бъде поне 3 символа')
                .max(30, 'Името трябва да бъде под 30 символа')
                .required('Името е задължително'),
            email: Yup.string()
                .email('Невалиден email')
                .required('Email е задължителен'),
            password: Yup.string()
                .min(6, 'Парлота трябва да бъде поне 6 символа')
                .max(30, 'Паролата трябва да бъде под 30 символа')
                .required('Паролата е задължителна'),
        }),
        onSubmit: (values) => {
           axios.post(API_URL + 'api/User/register', values)
           .then(response => {
            // Handle the response data here
            console.log('Response:', response.data);
          })
          .catch(error => {
            // Handle errors here
            console.error('Error:', error.message);
          });
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="username">Име:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username && (
                    <div>{formik.errors.username}</div>
                )}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                    <div>{formik.errors.email}</div>
                )}
            </div>
            <div>
                <label htmlFor="password">Парола:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                    <div>{formik.errors.password}</div>
                )}
            </div>
            <div>
                <button type="submit">Регистрирай се</button>
            </div>
        </form>
    );
};
export default RegisterForm;