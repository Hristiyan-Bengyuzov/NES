export function getAuthorizationHeader() {
    return `Bearer ${getToken()}`;
}

export function getToken() {
    return sessionStorage.getItem('token');
}