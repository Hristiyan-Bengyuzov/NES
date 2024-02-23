import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../common/GlobalConstants';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
    const navigate = useNavigate();

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
            axios.post(API_URL + '/api/User/register', values)
                .then(response => {
                    console.log('Response:', response.data);
                    Swal.fire({
                        title: "Успешна регистрация!",
                        text: "Можеш да влезеш в профила си.",
                        backdrop: "rgba(0,0,0,0.8)",
                        background: "#000000 url(https://i.gifer.com/QFNv.gif)",
                        color: "#fff",
                        iconColor: "#FF00FF",
                        confirmButtonColor: "#ee4542"

                    })
                        .then(result => {
                            if (result.isConfirmed || result.isDismissed) {
                                navigate('/login');
                            }
                        });
                })
                .catch(error => {
                    console.error('Error:', error.message);
                });
        },
    });
    return (
        <div className="backgroundLR">
            <div className="log-in-container">
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="username" className='LR-letters'>Име:</label>
                        <input
                            className='input-style'
                            type="text"
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <div className='ER-letters'>{formik.errors.username}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className='LR-letters'>Email:</label>
                        <input
                            className='input-style'
                            type="text"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className='ER-letters'>{formik.errors.email}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className='LR-letters'>Парола:</label>
                        <input className='input-style'
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className='ER-letters'>{formik.errors.password}</div>
                        )}
                    </div>
                    <div>
                        <button type="submit" className='quiz-button LR-submit'>&#62;Регистрирай се&#60;</button>
                    </div>
                </form>
            </div>
            <Link
                to={'/login'}
                style={{ textDecoration: 'none', color: 'rgb(228,228,228)', marginTop: '20px' }}
            >
                Вече имаш акаунт? Цъкни тук.
            </Link>
        </div>
    );
};
export default RegisterForm;