
export default function ParseJWT() {
    return JSON.parse(
        decodeURIComponent(
            atob(
                localStorage.getItem('accessToken').split('.')[1].replace('-', '+').replace('_', '/')
            ).split('').map(
                c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join('')
        )
    );
}