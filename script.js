// Time display
const timeEl = document.getElementById("time");
if (timeEl) {
  setInterval(() => {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString();
  }, 1000);
}

// Weather placeholder
const weatherEl = document.getElementById("weather");
if (weatherEl) {
  weatherEl.textContent = "Sunny, 22°C in Cape Town";
}

// Play/Pause toggle
const playButton = document.getElementById("play-button");
const radioAudio = document.getElementById("radio-audio");

if (playButton && radioAudio) {
  playButton.addEventListener("click", () => {
    if (radioAudio.paused) {
      radioAudio.play();
      playButton.textContent = "Pause";
    } else {
      radioAudio.pause();
      playButton.textContent = "Listen Live";
    }
  });
}

// Now Playing
const nowPlayingEl = document.getElementById("nowPlaying");
if (nowPlayingEl) {
  async function fetchNowPlaying() {
    try {
      const res = await fetch("http://uk18freenew.listen2myradio.com:22188/status-json.xsl");
      const data = await res.json();
      const title = data.icestats.source.title;
      nowPlayingEl.textContent = "Now Playing: " + title;
    } catch {
      nowPlayingEl.textContent = "Now Playing: Streaming live...";
    }
  }
  fetchNowPlaying();
  setInterval(fetchNowPlaying, 15000);
}

// Ripple effect
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("div");
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
const rotatingText = document.querySelector(".rotating-text");
if (rotatingText) {
  const textElements = rotatingText.querySelectorAll("span");
  let currentIndex = 0;
  function rotateText() {
    textElements[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % textElements.length;
    textElements[currentIndex].classList.add("active");
  }
  setInterval(rotateText, 3000);
}

// Particles
function createParticles() {
  const particlesContainer = document.querySelector(".particles");
  if (!particlesContainer) return;
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 6}s;
      width: ${2 + Math.random() * 4}px;
      height: ${2 + Math.random() * 4}px;
      animation-duration: ${4 + Math.random() * 8}s;
      opacity: ${0.3 + Math.random() * 0.7};
    `;
    particlesContainer.appendChild(particle);
  }
}
createParticles();

// Navigation
function navigateTo(page) {
  window.location.href = `${page}.html`;
}

// Highlight active nav
const currentPage = window.location.pathname.split("/").pop().replace(".html", "") || "index";
document.querySelectorAll("footer button").forEach(btn => {
  const label = btn.querySelector("p")?.textContent?.toLowerCase();
  if (label && currentPage.includes(label)) {
    btn.classList.add("active");
  }
});
