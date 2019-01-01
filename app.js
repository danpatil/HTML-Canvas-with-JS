const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

// Setting the canvas width and height to Window width and Height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isDrawing = false;
// last point on canvas on X and Y co-ordinate to 0
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

// Setting canvas stroke initial color and roundness, width.
ctx.strokeStyle = '#ffc600';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

function draw(e) {
    if(!isDrawing) return; //if not drawing then return
    console.log(e);
    ctx.strokeStyle = `hsl(${hue},100%, 50%)`;
    ctx.beginPath();
    // Start
    ctx.moveTo(lastX,lastY);
    // Go To
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
    [lastX,lastY] = [e.offsetX,e.offsetY];
    hue++;

    // Setting the stroke width from high roundeness to low roundness
    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    };

    if(direction) {
        ctx.lineWidth++;
    }else {
        ctx.lineWidth--;
    }
};

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX,lastY] = [e.offsetX,e.offsetY];
});

canvas.addEventListener('mouseup', () => isDrawing = false);

canvas.addEventListener('mouseout', () => isDrawing = false);
