import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../common/GlobalConstants';

const LogInForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Невалиден email')
        .required('Email е задължителен'),
      password: Yup.string()
        .min(6, 'Парлота трябва да бъде поне 6 символа')
        .max(30, 'Паролата трябва да бъде под 30 символа')
        .required('Паролата е задължителна'),
    }),
    onSubmit: (values) => {
      axios.post(API_URL + '/api/User/login', values)
        .then(response => {
          console.log('Response:', response.data);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            // Unauthorized
            formik.setFieldError('password', 'Грешен email или парола');
          } else {
            // other errors
            console.error('Error:', error.message);
          }
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
        <button type="submit">Влезни</button>
      </div>
    </form>
  );
};
export default LogInForm;