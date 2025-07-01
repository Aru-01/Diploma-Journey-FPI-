let idx = 0;
const card = document.getElementById("card");
const content = document.getElementById("content");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function render() {
  const slide = slides[idx];
  card.className = `card ${slide.bg} max-w-md w-full p-10`;
  const fontColor = slide.fontColor;

  let html = `<h2 class="text-2xl font-bold mb-4 text-center" style="color: ${slide.TColor}">${slide.title}</h2><ul style="color: ${fontColor}">`;

  slide.lines.forEach((line) => {
    if (typeof line === "string") {
      html += `<li class="mb-2">• ${line}</li>`;
    } else if (typeof line === "object" && line.isList) {
      html += `<li class="mb-2">${line.heading}<ol class="list-decimal list-inside ml-4 mt-2">`;
      line.items.forEach((item) => {
        html += `<li>${item}</li>`;
      });
      html += `</ol></li>`;
    }
  });

  html += `</ul>`;
  content.innerHTML = html;

  prevBtn.classList.toggle("hidden", idx === 0);
  nextBtn.textContent = idx === slides.length - 1 ? "Restart" : "Next ➡";

  if (idx === slides.length - 1) {
    nextBtn.onclick = () => {
      idx = 0;
      render();
    };
    setTimeout(() => {
      startCountdown();
    }, 100);
  } else {
    nextBtn.onclick = () => nav(1);
  }
}

function nav(dir) {
  idx = Math.max(0, Math.min(slides.length - 1, idx + dir));
  render();
}

function startCountdown() {
  const target = new Date("2025-07-13T10:00:00");

  function updateCountdown() {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      document.getElementById("countdownTimer").innerText =
        "📚 এখনই পরীক্ষা শুরু!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById(
      "countdownTimer"
    ).innerText = `🕒 পরীক্ষার বাকি: ${days} দিন ${hours} ঘণ্টা ${minutes} মিনিট ${seconds} সেকেন্ড`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

render();
