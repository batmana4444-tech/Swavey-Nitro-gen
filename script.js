// Change this to your desired access code
const ACCESS_CODE = "swavey123";  // Set whatever you want

// Particles 3D background
particlesJS("particles-js", {
    particles: {
        number: { value: 80 },
        color: { value: "#00ffea" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ff00c8", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" } },
    },
    retina_detect: true
});

// Login logic
const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');
const accessInput = document.getElementById('access-code');
const loginBtn = document.getElementById('login-btn');
const errorMsg = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');

loginBtn.addEventListener('click', () => {
    if (accessInput.value === ACCESS_CODE) {
        loginScreen.classList.remove('active');
        mainScreen.classList.add('active');
        errorMsg.textContent = '';
        accessInput.value = '';
    } else {
        errorMsg.textContent = 'Invalid Access Code';
    }
});

logoutBtn.addEventListener('click', () => {
    mainScreen.classList.remove('active');
    loginScreen.classList.add('active');
});

// Generator logic
const resultsDiv = document.getElementById('results');
const generateBtn = document.getElementById('generate-btn');
const clearBtn = document.getElementById('clear-btn');

function generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = Math.random() < 0.6 ? 16 : 24;
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

async function checkCode(code) {
    const apiUrl = `https://discord.com/api/v9/entitlements/gift-codes/${code}?with_application=false&with_subscription_plan=true`;

    try {
        const response = await fetch(apiUrl, { method: 'GET' });
        if (response.status === 200) {
            return { valid: true };
        } else if (response.status === 429) {
            return { valid: false, status: 'Rate Limited - Slowing down...' };
        }
    } catch (err) {}
    return { valid: false, status: 'Invalid' };
}

generateBtn.addEventListener('click', async () => {
    resultsDiv.innerHTML = '<p class="loading">Generating & checking codes...</p>';
    const codes = Array.from({length: 10}, generateCode);

    resultsDiv.innerHTML = '';

    for (const code of codes) {
        const card = document.createElement('div');
        card.classList.add('code-card');
        card.innerHTML = `
            <a href="https://discord.gift/\( {code}" target="_blank">https://discord.gift/ \){code}</a>
            <div class="status">Checking...</div>
        `;
        resultsDiv.appendChild(card);

        const result = await checkCode(code);
        const statusEl = card.querySelector('.status');
        statusEl.textContent = result.valid ? 'VALID NITRO!' : result.status || 'Invalid';

        if (result.valid) card.classList.add('valid');
        else if (result.status === 'Rate Limited - Slowing down...') {
            card.classList.add('ratelimited');
            await new Promise(r => setTimeout(r, 5000)); // Delay on rate limit
        } else card.classList.add('invalid');
    }
});

clearBtn.addEventListener('click', () => resultsDiv.innerHTML = '');
