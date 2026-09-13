const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let particles = [];
let animationId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function launchConfetti(count = 180) {
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * .3,
    size: Math.random() * 7 + 4,
    speedY: Math.random() * 5 + 3,
    speedX: (Math.random() - .5) * 5,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - .5) * 12,
    hue: Math.random() * 360
  }));

  cancelAnimationFrame(animationId);
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.rotation += p.rotationSpeed;
    p.speedY += .03;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation * Math.PI / 180);
    ctx.fillStyle = `hsl(${p.hue}, 90%, 65%)`;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * .65);
    ctx.restore();

    if (p.y > canvas.height + 30) particles.splice(index, 1);
  });

  if (particles.length) animationId = requestAnimationFrame(animateConfetti);
  else ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById("celebrateBtn").addEventListener("click", () => {
  launchConfetti(260);
  document.getElementById("hearts").innerHTML = "";
  for (let i = 0; i < 25; i++) createHeart();
});

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = ["❤️", "💖", "✨", "🎉", "🥳"][Math.floor(Math.random() * 5)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (Math.random() * 20 + 16) + "px";
  heart.style.animationDuration = (Math.random() * 4 + 4) + "s";
  document.getElementById("hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 8500);
}

document.getElementById("wishBtn").addEventListener("click", () => {
  document.querySelectorAll(".candle").forEach(c => c.classList.add("off"));
  document.getElementById("wishMessage").textContent =
    "✨ Your wish is on its way... May all your dreams come true! ❤️";
  launchConfetti(220);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: .15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

setInterval(() => {
  if (Math.random() > .45) createHeart();
}, 900);
