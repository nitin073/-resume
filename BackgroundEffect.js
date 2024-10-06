let banner = document.querySelector(".banner");
let canvas = document.getElementById("dotsCanvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext("2d");
const dots = [];
const arrayColors = [
  "#FFA07A",
  "#FFFFFF",
  "#32CD32",
  "#FF69B4",
  "#4CAF50",
  "#9C27B0",
  "#03A9F4",
  "#F7DC6F",
  "#E5E5EA",
  "#8B9467",
  "#FFC107",
  "#66D9EF",
  "#8BC34A",
  "#9B59B6",
  "#1A1D23",
  "#2ECC71",
  "#3498DB",
  "#F1C40F",
  "#E74C3C",
  "#2C3E50",
  "#95A5A6",
  "#663399",
  "#33CC33",
  "#0066CC",
  "#CC0099",
  "#9900CC",
  "#0099CC",
  "#CC6600",
]; // orange, white, green
for (let index = 0; index < 200; index++) {
  dots.push({
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    size: Math.random() * 3 + 5,
    color: arrayColors[Math.floor(Math.random() * arrayColors.length)],
    velocityX: Math.random() * 2 - 1,
    velocityY: Math.random() * 2 - 1,
  });
}
const drawDots = () => {
  dots.forEach((dot) => {
    ctx.fillStyle = dot.color;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
    ctx.fill();
  });
};
drawDots();
let mouseMoving = false;
let mouseMoveTimeout = null;
let mouseX = 0;
let mouseY = 0;
banner.addEventListener("mousemove", (event) => {
  mouseMoving = true;
  clearTimeout(mouseMoveTimeout);
  mouseMoveTimeout = setTimeout(() => {
    mouseMoving = false;
  }, 100); // reset mouseMoving to false after 100ms
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDots();
  mouseX = event.pageX - banner.getBoundingClientRect().left;
  mouseY = event.pageY - banner.getBoundingClientRect().top;
  drawConnections();
});
banner.addEventListener("mouseout", () => {
  mouseMoving = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDots();
});
window.addEventListener("resize", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = banner.offsetWidth;
  canvas.height = banner.offsetHeight;

  for (let index = 0; index < 100; index++) {
    dots.push({
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
      size: Math.random() * 3 + 5,
      color: arrayColors[Math.floor(Math.random() * 3)],
      velocityX: Math.random() * 2 - 1,
      velocityY: Math.random() * 2 - 1,
    });
  }
  drawDots();
});

const drawConnections = () => {
  dots.forEach((dot) => {
    let distance = Math.sqrt((mouseX - dot.x) ** 2 + (mouseY - dot.y) ** 2);
    if (distance < 300) {
      //----------------------------------------------------------line size
      ctx.strokeStyle = dot.color;
      ctx.lineWidth = 0.4; // ----------------line ka tnikness
      ctx.beginPath();
      ctx.moveTo(dot.x, dot.y);
      ctx.lineTo(mouseX, mouseY);
      ctx.stroke();
    }
  });
};
// Auto-change dots' locations
setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach((dot) => {
    dot.x += dot.velocityX;
    dot.y += dot.velocityY;

    if (dot.x < 0 || dot.x > canvas.width) {
      dot.velocityX *= -1;
    }
    if (dot.y < 0 || dot.y > canvas.height) {
      dot.velocityY *= -1;
    }
  });
  drawDots();
  if (
    mouseX > 0 &&
    mouseX < canvas.width &&
    mouseY > 0 &&
    mouseY < canvas.height
  ) {
    drawConnections();
  }
}, 16); // update every 16ms (approximately 60fps)
