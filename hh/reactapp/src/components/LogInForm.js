import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../common/GlobalConstants';
import "../styles/LogInForm.css";
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../utilities/authorizationHelper';
import useReturnUrl from '../utilities/useReturnUrl.js';

const LogInForm = () => {
  const navigate = useNavigate();
  const { redirectToStoredUrl } = useReturnUrl();

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
          sessionStorage.setItem('token', response.data.token);

          redirectToStoredUrl();

          if (isAdmin()) {
            navigate('/admin');
          }
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
    <div className="backgroundLR">
      <div className="log-in-container">
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email" className='LR-letters'>Email:</label>
            <input className="LR-input-field"
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
            <label htmlFor="password" className='LR-letters' >Парола:</label>
            <input className="LR-input-field"
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
            <button type="submit" className="LR-submit">Влезни</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LogInForm;