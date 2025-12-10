// script.js - Backend + Line Graph Integration

// Select elements
const out1 = document.getElementById('out1');
const out2 = document.getElementById('out2');
const canvas = document.getElementById('graph');

// Canvas setup
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Function to draw line graph
function drawLineGraph(data) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);

  const stepX = canvas.width / (data.length - 1);

  ctx.beginPath();
  ctx.lineWidth = 2;

  data.forEach((val, i) => {
    const x = i * stepX;
    const y = canvas.height - ((val - minVal) / (maxVal - minVal)) * canvas.height;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}

// Button event
document.querySelector('.btn').addEventListener('click', () => {
  const name = document.querySelectorAll('.input')[0].value;
  const age = document.querySelectorAll('.input')[1].value;
  const calories = document.querySelectorAll('.input')[2].value;
  const steps = document.querySelectorAll('.input')[3].value;
  const workout = document.querySelectorAll('.input')[4].value;

  out1.textContent = `${name}, Age ${age}, consumed ${calories} calories.`;
  out2.textContent = `Steps: ${steps}, Workout: ${workout}`;

  const graphData = [
    Number(age) || 10,
    Number(calories) / 10 || 20,
    Number(steps) / 50 || 30,
    Number(workout) * 5 || 5
  ];

  drawLineGraph(graphData);
});
