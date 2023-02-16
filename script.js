const canvas = document.querySelector('.canvas');
const colorModeBtns = document.querySelectorAll('button[name="mode"]');
const slider = document.querySelector('.pixel-density__slider');
const resetBtn = document.querySelector('button[name="reset"]');
let colorMode = "black";

document.addEventListener('DOMContentLoaded', (e) => {
    createGrid(slider.value);
});


// || EVENT LISTENERS --------------------
// Check if user is holding down mouse button
let mouseDown = false;
document.addEventListener('mousedown', () => mouseDown = true);
document.addEventListener('mouseup', () => mouseDown = false);

// When user moves slider, create a newly sized grid
slider.addEventListener('input', (e) => {
    const size = slider.value;
    const output = document.querySelector('.pixel-density__output')

    removeGrid();
    createGrid(size);
    output.innerText = size;
});

// When user clicks 'reset' button, clear the canvas
resetBtn.addEventListener('click', (e) => {
    const pixels = document.querySelectorAll('.canvas > div');
    pixels.forEach(pixel => pixel.style.backgroundColor = 'transparent');
});

// Change coloring mode
// Show which coloring mode is selected
colorModeBtns.forEach(button => {
    button.addEventListener('click', changeColorMode);
    button.addEventListener('click', showSelectedMode);
});


// || HELPER FUNCTIONS --------------------
function createGrid(size) {
    const totalPixels = size * size;

    canvas.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < totalPixels; i++) {
        const pixel = document.createElement('div');
        // Added CSS property 'user-select = none', so browser won't see click and drag as selecting (disabling mouse pointer as a result)
        pixel.classList.add('canvas__pixel');

        // Click to color individual pixel
        pixel.addEventListener('mousedown', changePixelColor);
        // Hold down mouse button and drag to color multiple pixels
        pixel.addEventListener('mouseenter', changePixelColor);
        
        canvas.append(pixel);
    }
}

function removeGrid() {
    while(canvas.hasChildNodes()) {
        canvas.removeChild(canvas.firstChild);
    }
}

function changePixelColor(e) {
    // Left operand checks if user is clicking on individual pixels
    // Right operand checks if user is holding down mouse button
    if (e.type === 'mouseenter' && !mouseDown) return;

    if (colorMode === "black") {
        this.style.backgroundColor = '#333';

    } else if (colorMode === "random") {
        const randomColor = getRandomColor();
        this.style.backgroundColor = randomColor;

    } else if (colorMode === "erase") {
        this.style.backgroundColor = 'transparent';
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 255) + 1;
    const g = Math.floor(Math.random() * 255) + 1;
    const b = Math.floor(Math.random() * 255) + 1;
    return `rgb(${r}, ${g}, ${b})`;
}

function changeColorMode(e) {
    colorMode = this.value;
}

function showSelectedMode(e) {
    const selectedBtn = document.querySelector('button[name="mode"] .selected');
    const btnFront = this.firstElementChild;

    selectedBtn?.classList.remove('selected');
    // Add selected class to span element
    btnFront.classList.add('selected');

    /* // Test code for adding selected class to multiple spans
    colorModeBtns.forEach(button => {
        if (e.currentTarget !== button) {
            button.firstElementChild.classList.add('selected');
        } else {
            button.firstElementChild.classList.remove('selected');
        }
    }); */
}