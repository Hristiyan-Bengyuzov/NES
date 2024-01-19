export function getAuthorizationHeader() {
    return `Bearer ${getToken()}`;
}

export function getToken() {
    return localStorage.getItem('token');
}