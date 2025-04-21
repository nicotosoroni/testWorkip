const grid = document.getElementById('grid');
const paletteColors = document.querySelectorAll('.color');
const colorPickerModal = document.getElementById('palette');

let painting = false;
let selectedColor = '#ff00ff';

const cellSize = window.innerWidth / 100;
const rows = Math.floor(window.innerHeight / cellSize);

function hexToRgb(hex) {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgb(${r}, ${g}, ${b})`;
}

for (let x = 0; x < 100 * rows; x++) {
  const cell = document.createElement('div');
  cell.style.width = `${cellSize}px`;
  cell.style.height = `${cellSize}px`;
  cell.classList.add('cell');
  grid.appendChild(cell);

  cell.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      return;
    }
    const currentBg = cell.style.backgroundColor;
    const selectedRgb = hexToRgb(selectedColor);

    if (currentBg === selectedRgb) {
      cell.style.backgroundColor = '';
    } else {
      cell.style.backgroundColor = selectedColor;
    }

    painting = true;
  });

  cell.addEventListener('mouseover', () => {
    const currentBg = cell.style.backgroundColor;
    const selectedRgb = hexToRgb(selectedColor);

    if (painting && currentBg !== selectedRgb) {
      cell.style.backgroundColor = selectedColor;
    }
  });

  cell.addEventListener('mouseup', () => {
    painting = false;
  });
}

document.body.addEventListener('mouseup', () => {
  painting = false;
});

paletteColors.forEach((color) => {
  color.style.backgroundColor = color.dataset.color;
  color.addEventListener('click', () => {
    selectedColor = color.dataset.color;
    paletteColors.forEach((c) => (c.style.outline = '2px solid transparent'));
    color.style.outline = '2px solid black';
    colorPickerModal.classList.remove('visible');
    setTimeout(() => {
      colorPickerModal.classList.add('hidden');
    }, 300);
  });
});

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();

  colorPickerModal.style.left = `${e.clientX}px`;
  colorPickerModal.style.top = `${e.clientY}px`;

  colorPickerModal.classList.remove('hidden');
  colorPickerModal.classList.add('visible');
});

// colorPickerModal.addEventListener('mouseleave', () => {
//   colorPickerModal.classList.remove('visible');
//   setTimeout(() => {
//     colorPickerModal.classList.add('hidden');
//   }, 300);
// });

colorPickerModal.addEventListener('mousedown', (e) => {
  e.stopPropagation();
});
