export function getAuthorizationHeader() {
    return `Bearer ${getToken()}`;
}

export function getToken() {
    return sessionStorage.getItem('token');
}

export function isAdmin() {
    const getIsAdminFromJwtPayload = (jwt) => {
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = atob(base64);
        const jsonPayload = JSON.parse(payload);
        return jsonPayload.isAdmin;
    }

    if (getToken()) {
        return getIsAdminFromJwtPayload(getToken()) === 'yes';
    }

    return false;
}