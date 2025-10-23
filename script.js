// Time
const timeEl = document.getElementById("time");
setInterval(() => {
  const now = new Date();
  timeEl.textContent = now.toLocaleTimeString();
}, 1000);

// Play button
document.getElementById("play-button").addEventListener("click", () => {
  document.getElementById("radio-audio").play();
});

// Now Playing
async function fetchNowPlaying() {
  try {
    const res = await fetch("http://uk18freenew.listen2myradio.com:22188/status-json.xsl");
    const data = await res.json();
    const title = data.icestats.source.title;
    document.getElementById("nowPlaying").textContent = "Now Playing: " + title;
  } catch {
    document.getElementById("nowPlaying").textContent = "Now Playing: Streaming live...";
  }
}
fetchNowPlaying();
setInterval(fetchNowPlaying, 15000);

// Ripple effect
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      width: 100px;
      height: 100px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      top: ${e.offsetY}px;
      left: ${e.offsetX}px;
      margin-top: -50px;
      margin-left: -50px;
      pointer-events: none;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Rotating text
const rotatingText = document.querySelector('.rotating-text');
const textElements = rotatingText.querySelectorAll('span');
let currentIndex = 0;
function rotateText() {
  textElements[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % textElements.length;
  textElements[currentIndex].classList.add('active');
}
setInterval(rotateText, 3000);

// Particles
function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  const particleCount = 15;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const leftPos = Math.random() * 100;
    const delay = Math.random() * 6;
    const size = 2 + Math.random() * 4;
    const duration = 4 + Math.random() * 8;
    particle.style.cssText = `
      left
