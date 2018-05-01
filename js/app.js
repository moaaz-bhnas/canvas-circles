/* --- Random Color Generator --- */
const generateRandomColor = () => {
    const characters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
    let color = '#';
    for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * 16);
        color += characters[randomIndex];
    }
    return color;
}

/* --- Canvas --- */
const canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d');
/*
    "ctx" is our magic paintbrush to draw on the canvas
    It's an object that has a lot of methods for drawing
*/

const fullSizeCanvas = () => {
    const canvasBorderWidth = 1;
    canvas.width = window.innerWidth - (canvasBorderWidth*2);
    canvas.height = window.innerHeight - (canvasBorderWidth*2);
}
fullSizeCanvas();

/* ===============================================
    Interactions
================================================== */
const mouse = {
    x: undefined,
    y: undefined
};

canvas.addEventListener('mousemove', event => {
    mouse.x = event.x;
    mouse.y = event.y;
});

/*
canvas.addEventListener('mousemove', function checkDistanceFromMouse(event) {
    for (const circle of circlesArray) {
        if (Math.abs(event.x - circle.x) < 70 && Math.abs(event.y - circle.y) < 70) {
            if (circle.radius < circle.maxRadius) {
                circle.radius++;
            }
        } else if (circle.radius > circle.minRadius) {
            circle.radius--;
        }
    }
}); 

    - Here the problem is in the "event type (mousemove)" itself. 
    - If the mouse stop moving, all the functionality will stop because the handler isn't running.
    - No circles will grow or shrink.
    - But if you put this function "checkDistanceFromMouse" in "update", it will run and test every frame even if the mouse isn't running.
    - we test using "x, y" that we extracted from the event.
*/

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

window.addEventListener('resize', () => {
    fullSizeCanvas();
    init();
});

/* ===============================================
    Animation
================================================== */
class Circle {
    constructor({radius = (Math.random()*5)+5,
                 x = (Math.random() * (window.innerWidth - radius*2)) + radius, 
                 y = (Math.random() * (window.innerHeight - radius*2)) + radius, 
                 color = generateRandomColor(), 
                 dx = (Math.random()-0.5)*4, 
                 dy = (Math.random()-0.5)*4} = {}) {
        this.radius = radius;
        this.minRadius = radius;
        this.maxRadius = 50;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }
    
    draw() {
        ctx.beginPath(); // to separate the two shapes from being connected with each other.
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
//        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = .9;
//        ctx.stroke();
        ctx.fill();
    }
    
    update() {
        this.x += this.dx;
        this.y += this.dy;
        
        this.draw();
        
        /* --- Interactivity --- */
        this.checkDistanceFromMouse();
        
        this.boundariesTest();
    }
    
    checkDistanceFromMouse() {
        if (Math.abs(mouse.x - this.x) < 70 && Math.abs(mouse.y - this.y) < 70) {
            if (this.radius < this.maxRadius) {
                this.radius++;
            }
        } else if (this.radius > this.minRadius) {
            this.radius--;
        }
    }
    
    boundariesTest() {
        if ((this.x+this.radius > window.innerWidth) || (this.x-this.radius < 0))
            this.dx = -this.dx;
        if ((this.y+this.radius > window.innerHeight) || (this.y-this.radius < 0))
            this.dy = -this.dy;
    }
}

/* --- Instantiate circles --- */
let circlesArray = [];
const init = () => {
    circlesArray = [];
    for (let i = 0; i < 400; i++) {
        circlesArray.push(new Circle());
    }
    for (const circle of circlesArray) {
        circle.draw();
    }
}
init();

/* --- Animate --- */
const animate = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const circle of circlesArray) {
        circle.update();
    }
    requestAnimationFrame(animate);
}

animate();


