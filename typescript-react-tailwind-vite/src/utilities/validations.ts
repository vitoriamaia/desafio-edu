export const validateEmail = (email: string) => {
    return String(email).toLowerCase().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
}
export const validatePassword = (password: string) => {
    return password.length >= 6;
}