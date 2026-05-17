
export const onlyLettersRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
export const phoneRegex = /^[0-9]{8,15}$/;

export const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

export const validateName = (name) => {
    return onlyLettersRegex.test(name.trim());
};

export const validatePhone = (phone) => {
    return phoneRegex.test(phone.trim());
};

export const validateEmail = (email) => {
    return emailRegex.test(email.trim());
};