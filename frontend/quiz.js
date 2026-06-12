const ALL_QUESTIONS = {
    Coding: [
        { q: "What does HTML stand for?", opts: ["Hyper Text Markup Language","High Tech Modern Language","Hyper Transfer Markup Logic","Home Tool Markup Language"], ans: 0 },
        { q: "Which symbol is used for comments in JavaScript?", opts: ["//","##","**","$$"], ans: 0 },
        { q: "What does CSS stand for?", opts: ["Cascading Style Sheets","Computer Style System","Creative Style Sheets","Colored Style Syntax"], ans: 0 },
        { q: "Which tag links a JavaScript file in HTML?", opts: ["<script>","<js>","<link>","<code>"], ans: 0 },
        { q: "What does DOM stand for?", opts: ["Document Object Model","Data Object Method","Display Output Mode","Dynamic Object Map"], ans: 0 },
    ],
    Geography: [
        { q: "What is the capital of Japan?", opts: ["Tokyo","Beijing","Seoul","Bangkok"], ans: 0 },
        { q: "Which is the longest river in the world?", opts: ["Nile","Amazon","Yangtze","Mississippi"], ans: 0 },
        { q: "Which country has the most natural lakes?", opts: ["Canada","Russia","USA","Brazil"], ans: 0 },
        { q: "What is the smallest country in the world?", opts: ["Vatican City","Monaco","San Marino","Liechtenstein"], ans: 0 },
        { q: "Which is the largest desert in the world?", opts: ["Sahara","Antarctic","Arabian","Gobi"], ans: 1 },
    ],
    Science: [
        { q: "What planet is closest to the Sun?", opts: ["Mercury","Venus","Earth","Mars"], ans: 0 },
        { q: "What is the chemical symbol for water?", opts: ["H2O","CO2","O2","HO"], ans: 0 },
        { q: "How many bones are in the adult human body?", opts: ["206","186","226","256"], ans: 0 },
        { q: "What gas do plants absorb from the atmosphere?", opts: ["CO2","O2","N2","H2"], ans: 0 },
        { q: "What is the approximate speed of light?", opts: ["300,000 km/s","150,000 km/s","500,000 km/s","100,000 km/s"], ans: 0 },
    ],
    Movies: [
        { q: "Who directed the movie 'Inception'?", opts: ["Christopher Nolan","Steven Spielberg","James Cameron","Ridley Scott"], ans: 0 },
        { q: "Which movie features the character 'Jack Sparrow'?", opts: ["Pirates of the Caribbean","Treasure Island","The Sea Hawk","Cutthroat Island"], ans: 0 },
        { q: "What year was the first 'Jurassic Park' released?", opts: ["1993","1990","1995","1988"], ans: 0 },
        { q: "Which film won the first Academy Award for Best Picture?", opts: ["Wings","The Jazz Singer","Sunrise","Seventh Heaven"], ans: 0 },
        { q: "Who played Iron Man in the Marvel films?", opts: ["Robert Downey Jr.","Chris Evans","Mark Ruffalo","Chris Hemsworth"], ans: 0 },
    ],
    Sports: [
        { q: "How many players are on a football (soccer) team?", opts: ["11","9","10","12"], ans: 0 },
        { q: "In which sport is a 'shuttlecock' used?", opts: ["Badminton","Tennis","Squash","Volleyball"], ans: 0 },
        { q: "How many rings are on the Olympic flag?", opts: ["5","4","6","3"], ans: 0 },
        { q: "Which country invented basketball?", opts: ["USA","Canada","UK","France"], ans: 0 },
        { q: "How long is a standard marathon in km?", opts: ["42.195","40","45","38.5"], ans: 0 },
    ],
    Music: [
        { q: "How many strings does a standard guitar have?", opts: ["6","4","5","8"], ans: 0 },
        { q: "Which instrument has 88 keys?", opts: ["Piano","Organ","Accordion","Harpsichord"], ans: 0 },
        { q: "What does 'forte' mean in music?", opts: ["Loud","Soft","Fast","Slow"], ans: 0 },
        { q: "Which music format came before CDs?", opts: ["Vinyl records","Cassette tapes","8-track","MP3"], ans: 0 },
        { q: "How many notes are in a musical octave?", opts: ["8","7","12","5"], ans: 0 },
    ],
};

const LETTERS = ["A", "B", "C", "D"];
let questions = [], current = 0, score = 0, timer = null, timeLeft = 10;

function getCategory() {
    try {
        return new URLSearchParams(window.location.search).get("category") || "Coding";
    } catch {
        return "Coding";
    }
}

function startQuiz() {
    const cat = getCategory();
    const key = Object.keys(ALL_QUESTIONS).find(k => cat.includes(k)) || "Coding";
    questions = ALL_QUESTIONS[key];
    document.getElementById("qb-cat").textContent = key;
    current = 0;
    score = 0;
    document.getElementById("qb-score").textContent = 0;
    document.getElementById("quiz-screen").style.display = "block";
    document.getElementById("result-screen").style.display = "none";
    showQuestion();
}

function showQuestion() {
    const q = questions[current];
    document.getElementById("qb-qnum").textContent = "Question " + (current + 1) + " of 5";
    document.getElementById("qb-progress").style.width = ((current + 1) / 5 * 100) + "%";
    document.getElementById("qb-question").textContent = q.q;

    const opts = document.getElementById("qb-options");
    opts.innerHTML = "";
    q.opts.forEach(function (opt, i) {
        const btn = document.createElement("button");
        btn.className = "opt";
        btn.innerHTML = '<span class="letter">' + LETTERS[i] + '</span>' + opt;
        btn.onclick = function () { selectAnswer(i); };
        opts.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 10;
    updateTimerUI();
    timer = setInterval(function () {
        timeLeft--;
        updateTimerUI();
        if (timeLeft <= 0) {
            clearInterval(timer);
            timeOut();
        }
    }, 1000);
}

function updateTimerUI() {
    const pct = (timeLeft / 10) * 100;
    const fill = document.getElementById("timer-fill");
    fill.style.width = pct + "%";
    if (timeLeft > 5) fill.style.background = "cyan";
    else if (timeLeft > 2) fill.style.background = "#EF9F27";
    else fill.style.background = "#E24B4A";
    document.getElementById("timer-num").textContent = timeLeft;
}

function selectAnswer(idx) {
    clearInterval(timer);
    const q = questions[current];
    const btns = document.querySelectorAll(".opt");
    btns.forEach(function (b) { b.disabled = true; });
    btns[q.ans].classList.add("correct");
    if (idx !== q.ans) {
        btns[idx].classList.add("wrong");
    } else {
        score++;
        document.getElementById("qb-score").textContent = score;
    }
    setTimeout(nextQuestion, 1200);
}

function timeOut() {
    const q = questions[current];
    const btns = document.querySelectorAll(".opt");
    btns.forEach(function (b) { b.disabled = true; });
    btns[q.ans].classList.add("correct");
    setTimeout(nextQuestion, 1200);
}

function nextQuestion() {
    current++;
    if (current >= 5) {
        showResult();
        return;
    }
    showQuestion();
}

function showResult() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    document.getElementById("result-score").textContent = score + " / 5";
    const msgs = ["Keep practicing!", "Not bad!", "Good job!", "Great work!", "Almost perfect!", "Perfect score!"];
    document.getElementById("result-msg").textContent = msgs[score];
}

startQuiz();