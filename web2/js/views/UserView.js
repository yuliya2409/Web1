class UserView {
    constructor(controller) {
        this.controller = controller;
        this.initEventListeners();
    }

    initEventListeners() {
        const registrationForm = document.querySelector('form[action="registration"]');
        if (registrationForm) {
            registrationForm.addEventListener('submit', this.handleRegistration.bind(this));
        }

        const loginForm = document.querySelector('form[action="login"]');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }

        const profileForm = document.querySelector('form[action="profile"]');
        if (profileForm) {
            this.populateProfileForm();
            profileForm.addEventListener('submit', this.handleProfileUpdate.bind(this));
        }

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', this.handleLogout.bind(this));
        }
    }

    handleRegistration(event) {
        event.preventDefault();
        const formData = this.getFormData(event.target);
        
        try {
            this.controller.register(formData);
            this.showMessage('Реєстрація успішна! Ви можете увійти.', 'success');
            setTimeout(() => window.location.href = 'login.html', 2000);
        } catch (error) {
            this.showMessage(error.message, 'danger');
        }
    }

    handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            this.controller.login(email, password);
            this.showMessage('Вхід успішний!', 'success');
            setTimeout(() => window.location.href = 'profile.html', 2000);
        } catch (error) {
            this.showMessage(error.message, 'danger');
        }
    }

    handleProfileUpdate(event) {
        event.preventDefault();
        const formData = this.getFormData(event.target);
        
        try {
            this.controller.updateProfile(formData);
            this.showMessage('Профіль успішно оновлено!', 'success');
        } catch (error) {
            this.showMessage(error.message, 'danger');
        }
    }

    handleLogout() {
        this.controller.logout();
        window.location.href = 'login.html';
    }

    populateProfileForm() {
        const user = this.controller.getCurrentUser();
        if (user) {
            document.getElementById('name').value = user.name || '';
            document.getElementById('email').value = user.email || '';
            document.getElementById('gender').value = user.gender || '';
            document.getElementById('dob').value = user.dob || '';
        }
    }

    getFormData(form) {
        const formData = {};
        const inputs = form.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            if (input.id) {
                formData[input.id] = input.value;
            }
        });

        return formData;
    }

    showMessage(message, type = 'info') {
        let messageContainer = document.getElementById('message-container');
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.id = 'message-container';
            messageContainer.className = 'fixed-top text-center mt-5 pt-3';
            document.body.insertBefore(messageContainer, document.body.firstChild);
        }

        const messageElement = document.createElement('div');
        messageElement.className = `alert alert-${type} alert-dismissible fade show`;
        messageElement.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        messageContainer.innerHTML = ''; 
        messageContainer.appendChild(messageElement);
    }
}

export default UserView;