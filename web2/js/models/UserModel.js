class UserModel {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
    }

    register(userData) {
        const existingUser = this.users.find(user => user.email === userData.email);
        if (existingUser) {
            throw new Error('Користувач з такою електронною поштою вже існує');
        }

        this.users.push(userData);
        localStorage.setItem('users', JSON.stringify(this.users));
        return userData;
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Невірний email або пароль');
        }
        return user;
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser')) || null;
    }

    setCurrentUser(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    updateProfile(updatedData) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) {
            throw new Error('Користувач не авторизований');
        }

        const updatedUser = { ...currentUser, ...updatedData };
        this.setCurrentUser(updatedUser);

        const userIndex = this.users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            this.users[userIndex] = updatedUser;
            localStorage.setItem('users', JSON.stringify(this.users));
        }

        return updatedUser;
    }
}

export default new UserModel();