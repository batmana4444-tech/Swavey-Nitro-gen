@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Roboto:wght@400;500&display=swap');

body {
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    font-family: 'Roboto', sans-serif;
    color: #fff;
}

#bg-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.screen {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 1s ease;
}

.screen.active {
    opacity: 1;
    pointer-events: all;
}

.login-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 40px 60px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    transform: perspective(1000px) rotateX(10deg);
    transition: transform 0.6s ease;
    max-width: 400px;
    width: 90%;
}

.login-card:hover {
    transform: perspective(1000px) rotateX(0deg) translateY(-10px);
}

.login-card h1 {
    font-family: 'Orbitron', sans-serif;
    font-size: 3.5em;
    background: linear-gradient(90deg, #00ffea, #ff00c8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 10px;
}

.login-card p {
    font-size: 1.2em;
    margin-bottom: 30px;
    color: #aaa;
}

.login-card input {
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 10px;
    color: #fff;
    font-size: 1.1em;
}

.login-card input::placeholder { color: #ccc; }

.login-card button {
    padding: 15px 40px;
    background: linear-gradient(45deg, #00ffea, #ff00c8);
    border: none;
    border-radius: 50px;
    color: #000;
    font-weight: bold;
    cursor: pointer;
    font-size: 1.2em;
    transition: 0.3s;
}

.login-card button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 30px rgba(0, 255, 234, 0.6);
}

.error { color: #ff0066; margin-top: 10px; }

.header {
    text-align: center;
    margin-bottom: 40px;
}

.header h1 {
    font-family: 'Orbitron', sans-serif;
    font-size: 4em;
    background: linear-gradient(90deg, #00ffea, #ff00c8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.controls button {
    padding: 15px 30px;
    margin: 15px;
    background: linear-gradient(45deg, #ff00c8, #00ffea);
    border: none;
    border-radius: 50px;
    color: #000;
    font-weight: bold;
    cursor: pointer;
    font-size: 1.2em;
    transition: 0.4s;
}

.controls button:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 10px 30px rgba(255, 0, 200, 0.5);
}

.results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.code-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    transform: perspective(800px) rotateY(5deg);
    transition: all 0.5s ease;
}

.code-card:hover {
    transform: perspective(800px) rotateY(0deg) translateY(-10px);
}

.code-card.valid {
    border: 3px solid #00ff00;
    box-shadow: 0 0 40px rgba(0, 255, 0, 0.6);
}

.code-card.invalid {
    border: 3px solid #ff0000;
}

.code-card.ratelimited {
    border: 3px solid #ffff00;
}

.code-card a {
    color: #00ffea;
    font-size: 1.2em;
    font-family: monospace;
    text-decoration: none;
    word-break: break-all;
}

.code-card .status {
    margin-top: 15px;
    font-weight: bold;
    font-size: 1.3em;
}

#logout-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: white;
}
