import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../common/GlobalConstants';
import { getToken } from '../utilities/authorizationHelper';

const ThreadForm = () => {

    function getUserIdFromJwtPayload(jwt) {
        const base64Url = jwt.split('.')[1]; // Get the second part of the JWT
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL safe characters
        const payload = atob(base64); // Decode Base64 using atob
        const jsonPayload = JSON.parse(payload); // Parse JSON string
        return jsonPayload.userId; // Return the userId from the parsed JSON
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
            const userId = getUserIdFromJwtPayload(getToken());

            const formData = new FormData();
            formData.append('content', values.content);
            formData.append('image', values.image);
            formData.append('createdOn', values.createdOn);
            formData.append('userId', userId);

            axios.post(API_URL + '/api/Thread/postThread', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    console.log('Response:', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
    });

    return (
        <div className="backgroundLR">
            <div className="log-in-container">
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="content" className='LR-letters'>Content:</label>
                        <input className="LR-input-field"
                            type="text"
                            id="content"
                            name="content"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.content}
                        />
                        {formik.touched.content && formik.errors.content && (
                            <div className='ER-letters'>{formik.errors.content}</div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="image" className='LR-letters'>Изображение:</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={(event) => {
                                formik.setFieldValue('image', event.currentTarget.files[0]);
                            }}
                        />
                        {formik.errors.image && (
                            <div className='ER-letters'>{formik.errors.image}</div>
                        )}
                    </div>
                    <div>
                        <button type="submit" className="LR-submit">Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ThreadForm;