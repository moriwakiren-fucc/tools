const imageInput = document.getElementById("imageInput");
const baseImage = document.getElementById("baseImage");
const wrapper = document.getElementById("canvasWrapper");
const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");

const penBtn = document.getElementById("penBtn");
const eraserBtn = document.getElementById("eraserBtn");

const penPreview = document.getElementById("penPreview").getContext("2d");
const eraserPreview = document.getElementById("eraserPreview").getContext("2d");

let drawing = false;
let mode = null;

let penWidth = 5;
let eraserWidth = 20;

let scale = 1;
let offsetX = 0;
let offsetY = 0;

let history = [];
let historyIndex = -1;

imageInput.addEventListener("change", e => {
  const file = e.target.files[0];
  baseImage.src = URL.createObjectURL(file);
});

baseImage.onload = () => {
  canvas.width = baseImage.width;
  canvas.height = baseImage.height;
};

function updateTransform() {
  wrapper.style.transform =
    `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
}

function getPos(e) {
  if (e.touches) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.touches[0].clientX - rect.left) / scale,
      y: (e.touches[0].clientY - rect.top) / scale
    };
  }
  return { x: e.offsetX / scale, y: e.offsetY / scale };
}

function startDraw(e) {
  if (!mode) return;
  drawing = true;
  const p = getPos(e);
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
}

function draw(e) {
  if (!drawing) return;
  const p = getPos(e);
  ctx.lineTo(p.x, p.y);
  ctx.stroke();
}

function endDraw() {
  if (!drawing) return;
  drawing = false;
  saveHistory();
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", endDraw);

canvas.addEventListener("touchstart", e => {
  if (e.touches.length === 1) startDraw(e);
  if (e.touches.length === 2) pinchStart(e);
});

canvas.addEventListener("touchmove", e => {
  if (e.touches.length === 1) draw(e);
  if (e.touches.length === 2) pinchMove(e);
});

canvas.addEventListener("touchend", endDraw);

penBtn.onclick = () => {
  mode = "pen";
  ctx.globalCompositeOperation = "source-over";
  ctx.lineWidth = penWidth;
  penBtn.classList.add("active");
  eraserBtn.classList.remove("active");
};

eraserBtn.onclick = () => {
  mode = "eraser";
  ctx.globalCompositeOperation = "destination-out";
  ctx.lineWidth = eraserWidth;
  eraserBtn.classList.add("active");
  penBtn.classList.remove("active");
};

document.getElementById("colorPicker").onchange = e => {
  ctx.strokeStyle = e.target.value;
};

document.getElementById("penSize").oninput = e => {
  penWidth = e.target.value;
  if (mode === "pen") ctx.lineWidth = penWidth;
  drawPreview(penPreview, penWidth);
};

document.getElementById("eraserSize").oninput = e => {
  eraserWidth = e.target.value;
  if (mode === "eraser") ctx.lineWidth = eraserWidth;
  drawPreview(eraserPreview, eraserWidth);
};

function drawPreview(ctx, size) {
  ctx.clearRect(0, 0, 40, 40);
  ctx.beginPath();
  ctx.arc(20, 20, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
}

function saveHistory() {
  history = history.slice(0, historyIndex + 1);
  history.push(canvas.toDataURL());
  historyIndex++;
}

document.getElementById("undoBtn").onclick = () => undo();
document.getElementById("redoBtn").onclick = () => redo();

function undo() {
  if (historyIndex <= 0) return;
  historyIndex--;
  restore();
}

function redo() {
  if (historyIndex >= history.length - 1) return;
  historyIndex++;
  restore();
}

function restore() {
  const img = new Image();
  img.src = history[historyIndex];
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
}

document.getElementById("toggleCanvas").onchange = e => {
  canvas.style.display = e.target.checked ? "block" : "none";
};

let startDist = 0;
let startScale = 1;

function pinchStart(e) {
  startDist = distance(e.touches[0], e.touches[1]);
  startScale = scale;
}

function pinchMove(e) {
  const dist = distance(e.touches[0], e.touches[1]);
  scale = startScale * (dist / startDist);
  updateTransform();
}

function distance(a, b) {
  return Math.hypot(
    a.clientX - b.clientX,
    a.clientY - b.clientY
  );
}

drawPreview(penPreview, penWidth);
drawPreview(eraserPreview, eraserWidth);
updateTransform();
