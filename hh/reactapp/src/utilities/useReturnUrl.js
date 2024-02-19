import { useNavigate } from 'react-router-dom';
import { getToken } from './authorizationHelper.js';

const useReturnUrl = () => {
    const navigate = useNavigate();

    const storeReturnUrl = () => {
        localStorage.setItem('returnUrl', window.location.pathname);
    };

    const redirectToLoginIfNotAuth = () => {
        if (!getToken()) {
            storeReturnUrl();
            navigate('/login');
        }
    };

    // redirects the user to return url if there is one, otherwise to home
    const redirectToStoredUrl = () => {
        const returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
            navigate(returnUrl);
            localStorage.removeItem('returnUrl');
        } else {
            navigate('/home');
        }
    };

    return { redirectToLoginIfNotAuth, redirectToStoredUrl };
};

export default useReturnUrl;