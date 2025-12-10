// ==============================
// GET ELEMENTS
// ==============================
const inputs = document.querySelectorAll(".input");
const out1 = document.getElementById("out1");
const out2 = document.getElementById("out2");
const submitBtn = document.querySelector(".btn");
const graphCanvas = document.getElementById("graph");
const ctx = graphCanvas.getContext("2d");

// Resize canvas properly
graphCanvas.width = graphCanvas.offsetWidth;
graphCanvas.height = graphCanvas.offsetHeight;

function drawGraph(values) {
    ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);

    const labels = ["Calories", "Steps", "Workout", "Health"];
    const barWidth = 60;
    const gap = 40;
    const startX = 40;
    const maxBarHeight = graphCanvas.height - 40; // leave space for labels

    values.forEach((val, i) => {
        const x = startX + i * (barWidth + gap);

        // Scale each bar independently
        let barHeight;
        if (i === 3) {
            // Health is already 0-100
            barHeight = (val / 100) * maxBarHeight;
        } else {
            // Scale relative to max of Calories, Steps, Workout only
            const maxVal = Math.max(...values.slice(0, 3));
            barHeight = (val / maxVal) * maxBarHeight;
        }

        const y = graphCanvas.height - barHeight - 20;

        // Color
        if (i === 3) {
            if (val >= 70) ctx.fillStyle = "#4caf50";
            else if (val >= 40) ctx.fillStyle = "#ff9800";
            else ctx.fillStyle = "#f44336";
        } else {
            ctx.fillStyle = "#3ab8ff";
        }

        ctx.fillRect(x, y, barWidth, barHeight);

        // Labels
        ctx.fillStyle = "#fff";
        ctx.font = "14px Poppins";
        ctx.textAlign = "center";
        ctx.fillText(labels[i], x + barWidth / 2, graphCanvas.height - 5);

        // Values on top of bar
        ctx.fillText(
            i === 3 ? val + "/100" : val,
            x + barWidth / 2,
            y - 5
        );
    });
}






// ==============================
// FUNCTION: CALCULATE HEALTH SCORE
// ==============================
function calculateHealthScore(cal, steps, workout) {
    let score = 0;

    if (steps > 5000) score += 30;
    if (workout > 20) score += 40;

    // less calories = better (simple logic)
    if (cal < 2000) score += 30;

    return Math.min(score, 100);
}

// ==============================
// SUBMIT BUTTON EVENT
// ==============================
submitBtn.addEventListener("click", () => {

    const name = inputs[0].value;
    const age = inputs[1].value;
    const calories = parseInt(inputs[2].value) || 0;
    const steps = parseInt(inputs[3].value) || 0;
    const workout = parseInt(inputs[4].value) || 0;

    const healthScore = calculateHealthScore(calories, steps, workout);

    // OUTPUT PANELS
    out1.textContent = `${name}, Age ${age} — Your health score is ${healthScore}/100`;
    out2.textContent = 
        healthScore > 70 
        ? "Great! Keep maintaining your lifestyle."
        : "Needs improvement. Try adding more activity.";

    // DRAW GRAPH (4 bars)
    drawGraph([calories, steps, workout, healthScore]);
});
