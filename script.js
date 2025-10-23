// ⏰ Time display
const timeEl = document.getElementById("time");
if (timeEl) {
  setInterval(() => {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString();
  }, 1000);
}

// 🎧 Play/Pause toggle
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

// 🎶 Now Playing metadata
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

// 💫 Ripple effect on buttons
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

// 🔁 Rotating mission text
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

// 🌌 Floating particles
function createParticles() {
  const particlesContainer = document.querySelector(".particles");
  if (!particlesContainer) return;

  const particleCount = 15;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const leftPos = Math.random() * 100;
    const delay = Math.random() * 6;
    const size = 2 + Math.random() * 4;
    const duration = 4 + Math.random() * 8;

    particle.style.cssText = `
      left: ${leftPos}%;
      animation-delay: ${delay}s;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      opacity: ${0.3 + Math.random() * 0.7};
    `;

    particlesContainer.appendChild(particle);
  }
}
createParticles();

// 🧭 Navigation
function navigateTo(page) {
  window.location.href = `${page}.html`;
}

// 🌙 Theme toggle (on settings page)
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("change", function () {
    document.body.classList.toggle("dark-theme", this.checked);
    document.body.style.transition = "background 1s ease";
    setTimeout(() => {
      document.body.style.transition = "";
    }, 1000);
  });
}

// ✨ Fade-in animation on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fadeIn");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll("section").forEach(el => {
  observer.observe(el);
});
