// SELECT ELEMENTS
const inputs = document.querySelectorAll(".panel .input");
const btn = document.querySelector(".btn");

const out1 = document.getElementById("out1");
const out2 = document.getElementById("out2");
const graph = document.getElementById("graph");
const ctx = graph.getContext("2d");

// BUTTON CLICK FUNCTION
btn.addEventListener("click", () => {

    const name = inputs[0].value.trim();
    const age = parseInt(inputs[1].value.trim());
    const calories = parseInt(inputs[2].value.trim());
    const steps = parseInt(inputs[3].value.trim());
    const workout = parseInt(inputs[4].value.trim());

    // BASIC VALIDATION
    if (!name || !age || !calories || !steps || !workout) {
        out1.textContent = "Please fill all fields!";
        out2.textContent = "Data missing!";
        return;
    }

    // HEALTH SCORE CALC
    const healthScore = steps + workout * 10 - calories / 20;

    // CONDITION
    let condition = "";
    if (healthScore > 200) condition = "Excellent 💪";
    else if (healthScore > 100) condition = "Good 🙂";
    else if (healthScore > 50) condition = "Average 😐";
    else condition = "Needs Improvement 😓";

    out1.textContent = `${name}, your current health status is: ${condition}`;

    // FUTURE HEALTH PREDICTION
    const future = healthScore + 50;
    let futureText = future > 150 ? "Amazing Future Shape 🔥" : "You can still improve! ✨";

    out2.textContent = futureText;

    // GRAPH
    drawGraph([calories / 10, steps / 10, workout * 5, healthScore / 5]);
});


// SIMPLE GRAPH DRAWING
function drawGraph(values) {
    ctx.clearRect(0, 0, graph.width, graph.height);

    const barWidth = 40;
    const gap = 20;
    let x = 10;

    values.forEach(v => {
        ctx.fillStyle = "rgba(0, 200, 255, 0.6)";
        ctx.fillRect(x, graph.height - v, barWidth, v);
        x += barWidth + gap;
    });
}
