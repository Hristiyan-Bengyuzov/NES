import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../common/GlobalConstants';
import { getToken } from '../utilities/authorizationHelper';
import { useState } from 'react';
import useReturnUrl from '../utilities/useReturnUrl';

const ThreadForm = ({ parentId = '', buttonShow = true, onReply }) => {
    const { redirectToLoginIfNotAuth } = useReturnUrl();

    function getUserIdFromJwtPayload(jwt) {
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = atob(base64);
        const jsonPayload = JSON.parse(payload);
        return jsonPayload.userId;
    }

    const [opacity, setOpacity] = useState(buttonShow ? 0 : 1);

    const showPost = () => {
        setOpacity(opacity === 0 ? 1 : 0);
    }

    const formik = useFormik({
        initialValues: {
            content: '',
            image: '',
            createdOn: new Date().toISOString(),
        },
        validationSchema: Yup.object({
            content: Yup.string()
                .required('Полето не трябва да е празно.')
                .max(300, 'Трябва да е под 300 символа.'),
            image: Yup.mixed()
                .test('fileSize', 'Изображението трябва да е под 5MB.', (value) => {
                    if (!value) return true; // no image is valid
                    return value.size <= 5 * 1024 * 1024; // 5MB
                })
                .test('fileType', 'Невалиден формат на файла.', (value) => {
                    if (!value) return true;
                    return ['image/jpeg', 'image/png'].includes(value.type);
                }),
        }),
        onSubmit: (values) => {
            redirectToLoginIfNotAuth();

            const userId = getUserIdFromJwtPayload(getToken());

            const formData = new FormData();
            formData.append('content', values.content);
            formData.append('image', values.image);
            formData.append('createdOn', values.createdOn);
            formData.append('userId', userId);
            formData.append('parentId', parentId);


            for (const pair of formData.entries()) {
                console.log(`${pair[0]}    ${pair[1]}`);
            }

            axios.post(API_URL + '/api/Thread/postThread', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    // callback function to update shit on the page
                    onReply();
                    console.log('Response:', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
    });

    return (
        <div className='thread-container'>
            {buttonShow && (
                <div className="post-button" onClick={showPost}>[Попитай нещо]</div>
            )}
            <div className="post-container" style={{ opacity: opacity }}>
                <form onSubmit={formik.handleSubmit}>
                    <div className='post-content-container'>
                        <label htmlFor="content" className='post-letters'>Съдържание:</label>
                        <textarea className="post-input-field"
                            type="text"
                            id="content"
                            name="content"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.content}
                            rows={8}
                        />
                        {formik.touched.content && formik.errors.content && (
                            <div className='post-ER-letters'>{formik.errors.content}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="image" className='post-letters'>Изображение:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={(event) => {
                                formik.setFieldValue('image', event.currentTarget.files[0]);
                            }}
                        />
                        {formik.errors.image && (
                            <div className='post-ER-letters'>{formik.errors.image}</div>
                        )}
                    </div>
                    <div>
                        <button type="submit" className="publish">Качи</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ThreadForm;