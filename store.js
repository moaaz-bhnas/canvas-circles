/* ===============================================
    Drawing
================================================== */
/* --- Rectangle --- */
const drawRectangle = (x = (Math.random()*window.innerWidth), y = (Math.random()*window.innerHeight), width = (Math.random()*190)+10, height = (Math.random()*190)+10, color = generateRandomColor()) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

/* --- Line --- */
//ctx.beginPath();
//ctx.moveTo(100, 100);
//ctx.lineTo(500, 500);
//ctx.lineTo(100, 500);
//ctx.strokeStyle = generateRandomColor();
//ctx.stroke();

/* --- Arc / Circle --- */
//const drawCircle = (x = (Math.random()*window.innerWidth), y = (Math.random()*window.innerHeight), radius = (Math.random()*50)+10, color = generateRandomColor()) => {
//    ctx.beginPath(); // to separate the two shapes from being connected with each other.
//    ctx.arc(x, y, radius, 0, Math.PI*2, false);
//    ctx.strokeStyle = color;
//    ctx.stroke();
//}


canvas.addEventListener('mousemove', event => {
    console.log(event);
    for (const circle of circlesArray) {
        if (Math.abs(event.x - circle.x) < 50) {
            circle.radius++;
            console.log('M');
        }
    }
})

/* --- Pythagorean Theorem --- */
const getDistance = (x1, y1, x2, y2) => {
    const xDistance = x2 - x1,
          yDistance = y2 - y1;
    
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}


