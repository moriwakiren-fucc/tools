const imageInput = document.getElementById("imageInput");
const baseImage = document.getElementById("baseImage");
const canvas = document.getElementById("drawCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;
let mode = "pen";
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

canvas.addEventListener("mousedown", e => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", e => {
  if (!drawing) return;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  saveHistory();
});

document.getElementById("penBtn").onclick = () => {
  mode = "pen";
  ctx.globalCompositeOperation = "source-over";
};

document.getElementById("eraserBtn").onclick = () => {
  mode = "eraser";
  ctx.globalCompositeOperation = "destination-out";
};

document.getElementById("colorPicker").onchange = e => {
  ctx.strokeStyle = e.target.value;
};

document.getElementById("penSize").onchange = e => {
  ctx.lineWidth = e.target.value;
};

document.getElementById("eraserSize").onchange = e => {
  ctx.lineWidth = e.target.value;
};

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

document.getElementById("hideCanvas").onclick = () => {
  canvas.style.display = "none";
};

document.getElementById("showCanvas").onclick = () => {
  canvas.style.display = "block";
};
