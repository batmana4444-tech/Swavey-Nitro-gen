const ACCESS_CODE = "swavey123"; // Change this to your own code

const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');
const accessInput = document.getElementById('access-code');
const loginBtn = document.getElementById('login-btn');
const errorMsg = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const resultsDiv = document.getElementById('results');
const generateBtn = document.getElementById('generate-btn');
const clearBtn = document.getElementById('clear-btn');

loginBtn.addEventListener('click', () => {
    if (accessInput.value === ACCESS_CODE) {
        loginScreen.classList.remove('active');
        mainScreen.classList.add('active');
        errorMsg.textContent = '';
        accessInput.value = '';
    } else {
        errorMsg.textContent = 'Wrong Code';
    }
});

accessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') loginBtn.click();
});

logoutBtn.addEventListener('click', () => {
    mainScreen.classList.remove('active');
    loginScreen.classList.add('active');
});

function generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 24; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

async function checkCode(code) {
    const url = `https://discord.com/api/v9/entitlements/gift-codes/${code}?with_application=false&with_subscription_plan=true`;
    try {
        const res = await fetch(url);
        if (res.status === 200) return { valid: true };
        if (res.status === 429) return { valid: false, status: 'Rate Limited' };
    } catch {}
    return { valid: false, status: 'Invalid' };
}

generateBtn.addEventListener('click', async () => {
    resultsDiv.innerHTML = '<p style="text-align:center; color:#00ffea;">Checking codes...</p>';
    const codes = Array(10).fill().map(generateCode);
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
        card.querySelector('.status').textContent = result.valid ? 'VALID!' : result.status || 'Invalid';
        card.classList.add(result.valid ? 'valid' : result.status === 'Rate Limited' ? 'ratelimited' : 'invalid');

        if (result.status === 'Rate Limited') await new Promise(r => setTimeout(r, 7000));
    }
});

clearBtn.addEventListener('click', () => resultsDiv.innerHTML = '');
