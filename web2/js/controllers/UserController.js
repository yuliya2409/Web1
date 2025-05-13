import UserModel from '../models/UserModel.js';

class UserController {
    constructor() {
        this.model = UserModel;
    }

    register(userData) {
        this.validateRegistrationData(userData);
        
        userData.password = this.hashPassword(userData.password);
        
        return this.model.register(userData);
    }

    login(email, password) {
        if (!email || !password) {
            throw new Error('Введіть email та пароль');
        }

        const hashedPassword = this.hashPassword(password);
        
        const user = this.model.login(email, hashedPassword);
        
        this.model.setCurrentUser(user);
        return user;
    }

    logout() {
        this.model.logout();
    }

    getCurrentUser() {
        return this.model.getCurrentUser();
    }

    updateProfile(userData) {
        this.validateProfileUpdate(userData);
        
        return this.model.updateProfile(userData);
    }

    validateRegistrationData(userData) {
        const requiredFields = ['name', 'email', 'password', 'gender', 'dob'];
        
        requiredFields.forEach(field => {
            if (!userData[field]) {
                throw new Error(`Поле ${field} є обов'язковим`);
            }
        });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            throw new Error('Невірний формат електронної пошти');
        }

        if (userData.password.length < 6) {
            throw new Error('Пароль повинен містити принаймні 6 символів');
        }
    }

    validateProfileUpdate(userData) {
        if (userData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userData.email)) {
                throw new Error('Невірний формат електронної пошти');
            }
        }
    }

    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }
}

export default new UserController();