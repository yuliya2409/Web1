import UserController from './controllers/UserController.js';
import WordController from './controllers/WordController.js';
import UserView from './views/UserView.js';
import WordView from './views/WordView.js';

class DictionaryApp {
    constructor() {
        this.initControllers();
        this.initViews();
        this.checkAuthStatus();
    }

    initControllers() {
        this.userController = UserController;
        this.wordController = WordController;
    }

    initViews() {
        this.userView = new UserView(this.userController);
        this.wordView = new WordView(this.wordController);
    }

    checkAuthStatus() {
        const currentUser = this.userController.getCurrentUser();
        const currentPath = window.location.pathname;

        const protectedRoutes = [
            '/profile.html',
            '/study.html',
            '/quiz.html'
        ];

        const guestRoutes = [
            '/login.html',
            '/registration.html'
        ];

        if (currentUser) {
            if (guestRoutes.some(route => currentPath.endsWith(route))) {
                window.location.href = '/main.html';
            }
        } else {
            if (protectedRoutes.some(route => currentPath.endsWith(route))) {
                window.location.href = '/login.html';
            }
        }

        this.updateNavbarVisibility(currentUser);
    }

    updateNavbarVisibility(currentUser) {
        const navItems = document.querySelectorAll('.navbar-nav .nav-item');
        
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const href = link.getAttribute('href');

            if (currentUser) {
                if (href.includes('login.html') || href.includes('registration.html')) {
                    item.style.display = 'none';
                }
            } 
            else {
                if (href.includes('profile.html')) {
                    item.style.display = 'none';
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new DictionaryApp();
});

export default DictionaryApp;