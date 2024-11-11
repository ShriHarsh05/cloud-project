// Elements
const form = document.getElementById('auth-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const switchText = document.getElementById('switch');
const toggleForm = document.getElementById('toggle-form');
const successSound = document.getElementById('success-sound');

let isLoginMode = true;

// Initialize JSON storage (for demo purposes)
let users = JSON.parse(localStorage.getItem('users')) || [];

// Switch between login and signup mode
switchText.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    formTitle.textContent = isLoginMode ? 'Login' : 'Sign Up';
    submitBtn.textContent = isLoginMode ? 'Login' : 'Sign Up';
    toggleForm.innerHTML = isLoginMode ? "Don't have an account? <span id='switch'>Sign Up</span>" 
                                        : "Already have an account? <span id='switch'>Login</span>";
    document.body.style.animation = 'backgroundChange 10s forwards';
});

// Form submission handler
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (isLoginMode) {
        // Login logic
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            playSuccess();
            alert('Login successful!');
        } else {
            alert('Invalid username or password');
        }
    } else {
        // Sign up logic
        if (users.some(user => user.username === username)) {
            alert('Username already exists!');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            playSuccess();
            alert('Sign-up successful!');
        }
    }
});

// Play success sound
function playSuccess() {
    successSound.play();
}