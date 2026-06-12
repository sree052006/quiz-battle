document.addEventListener("DOMContentLoaded", function () {

    const CIRCUMFERENCE = 2 * Math.PI * 95;
    const ring = document.getElementById("ring");
    const numEl = document.getElementById("num");
    const goEl = document.getElementById("go-text");
    const statusEl = document.getElementById("status");

    ring.style.strokeDasharray = CIRCUMFERENCE;
    ring.style.strokeDashoffset = 0;

    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category") || "Quiz";
    document.getElementById("cat-label").textContent = cat;

    const statusTexts = ["Get ready...", "Almost there!", "Here we go!"];
    const colors = ["cyan", "#FAC775", "#E24B4A"];

    let count = 3;
    let elapsed = 0;
    const totalMs = 1000;
    const step = 1000 / 60;

    numEl.textContent = count;

    const timer = setInterval(function () {
        elapsed += step;
        const frac = Math.min(elapsed / totalMs, 1);
        ring.style.strokeDashoffset = CIRCUMFERENCE * frac;

        if (elapsed >= totalMs) {
            elapsed = 0;
            count--;

            if (count <= 0) {
                clearInterval(timer);
                numEl.style.display = "none";
                goEl.classList.add("show");
                statusEl.textContent = "Quiz starting!";
                ring.style.strokeDashoffset = CIRCUMFERENCE;

                // Redirect to quiz page after GO!
                setTimeout(function () {
                    window.location.href = "quiz.html";
                }, 1500);
                return;
            }

            const idx = 3 - count;
            ring.style.stroke = colors[idx];
            ring.style.strokeDashoffset = 0;
            statusEl.textContent = statusTexts[idx];
            numEl.textContent = count;
        }
    }, step);

});