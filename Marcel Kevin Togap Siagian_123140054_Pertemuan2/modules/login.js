// modules/login.js

// Fitur ES6+: import
import { loginUser, registerUser } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    // Fitur ES6+: const
    const loginForm = document.getElementById('login-form');
    const registerBtn = document.getElementById('register-btn');
    const errorMessage = document.getElementById('error-message');

    // Fitur ES6+: Arrow Function, async/await
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.textContent = ''; // Bersihkan error

        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            // Gunakan async/await untuk simulasi validasi
            await loginUser(username, password);
            window.location.href = 'dashboard.html'; // Redirect ke dashboard
        } catch (error) {
            errorMessage.textContent = error.message;
        }
    });

    // Fitur ES6+: Arrow Function, async/await
    registerBtn.addEventListener('click', async () => {
        errorMessage.textContent = '';
        
        // Ambil nilai dari form untuk register
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            errorMessage.textContent = 'Isi NIM dan Password untuk register.';
            return;
        }

        try {
            await registerUser(username, password);
            // Setelah register, langsung coba login
            await loginUser(username, password);
            window.location.href = 'dashboard.html';
        } catch (error) {
            errorMessage.textContent = error.message;
        }
    });
});