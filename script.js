// ===============================
// KVÍZ ADATOK
// ===============================

const questions = {

    tortenelem: [
        {
            question: "Mikor ért véget a második világháború Európában?",
            answers: ["1943", "1944", "1945", "1946"],
            correct: 2
        },
        {
            question: "Ki volt Magyarország első királya?",
            answers: ["Mátyás király", "Szent István", "IV. Béla", "Kossuth Lajos"],
            correct: 1
        },
        {
            question: "Melyik évben kezdődött az 1848–49-es magyar forradalom és szabadságharc?",
            answers: ["1846", "1847", "1848", "1849"],
            correct: 2
        },
        {
            question: "Ki volt Napóleon?",
            answers: [
                "Francia katonai vezető és császár",
                "Angol király",
                "Orosz cár",
                "Német kancellár"
            ],
            correct: 0
        },
        {
            question: "Melyik nép építette a piramisokat az ókorban?",
            answers: ["Rómaiak", "Egyiptomiak", "Vikingek", "Görögök"],
            correct: 1
        }
    ],

    foldrajz: [
        {
            question: "Mi Magyarország fővárosa?",
            answers: ["Debrecen", "Szeged", "Budapest", "Pécs"],
            correct: 2
        },
        {
            question: "Melyik a Föld legnagyobb óceánja?",
            answers: ["Atlanti-óceán", "Csendes-óceán", "Indiai-óceán", "Jeges-tenger"],
            correct: 1
        },
        {
            question: "Melyik kontinensen található Egyiptom?",
            answers: ["Ázsia", "Európa", "Afrika", "Dél-Amerika"],
            correct: 2
        },
        {
            question: "Melyik a világ legmagasabb hegye?",
            answers: ["K2", "Mount Everest", "Mont Blanc", "Kilimandzsáró"],
            correct: 1
        },
        {
            question: "Melyik ország fővárosa Párizs?",
            answers: ["Olaszország", "Spanyolország", "Franciaország", "Belgium"],
            correct: 2
        }
    ],

    biologia: [
        {
            question: "Melyik szerv pumpálja a vért az emberi testben?",
            answers: ["Tüdő", "Szív", "Máj", "Vese"],
            correct: 1
        },
        {
            question: "Melyik gázt használják a növények a fotoszintézis során?",
            answers: ["Oxigén", "Nitrogén", "Szén-dioxid", "Hélium"],
            correct: 2
        },
        {
            question: "Hány lába van egy póknak?",
            answers: ["6", "8", "10", "12"],
            correct: 1
        },
        {
            question: "Melyik szerv felelős elsősorban a gondolkodásért?",
            answers: ["Szív", "Agy", "Gyomor", "Tüdő"],
            correct: 1
        },
        {
            question: "Melyik állat emlős?",
            answers: ["Cápa", "Delfin", "Krokodil", "Pingvin"],
            correct: 1
        }
    ],

    informatika: [
        {
            question: "Mit jelent a CPU rövidítés?",
            answers: [
                "Central Processing Unit",
                "Computer Personal Unit",
                "Central Program User",
                "Computer Processing Utility"
            ],
            correct: 0
        },
        {
            question: "Melyik egy programozási nyelv?",
            answers: ["HTML", "Python", "Wi-Fi", "USB"],
            correct: 1
        },
        {
            question: "Melyik eszköz tárol adatokat?",
            answers: ["SSD", "Monitor", "Billentyűzet", "Egér"],
            correct: 0
        },
        {
            question: "Mit használunk weboldalak szerkezetének létrehozására?",
            answers: ["HTML", "MP3", "JPEG", "USB"],
            correct: 0
        },
        {
            question: "Melyik eszköz használható számítógép vezérlésére?",
            answers: ["Egér", "Hangszóró", "Nyomtató", "Mikrofon"],
            correct: 0
        }
    ]
};


// ===============================
// VÁLTOZÓK
// ===============================

let playerName = "";
let selectedCategory = "";
let selectedDifficulty = "";

let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

let quizQuestions = [];

let startTime = 0;
let timerInterval;


// ===============================
// KATEGÓRIA KIVÁLASZTÁSA
// ===============================

function selectCategory(category) {
    selectedCategory = category;

    document.querySelectorAll(".categories button").forEach(button => {
        button.style.outline = "";
    });

    event.target.style.outline = "4px solid #00c853";
}


// ===============================
// NEHÉZSÉG KIVÁLASZTÁSA
// ===============================

function selectDifficulty(difficulty) {
    selectedDifficulty = difficulty;

    document.querySelectorAll(".difficulty button").forEach(button => {
        button.style.outline = "";
    });

    event.target.style.outline = "4px solid #2196f3";
}


// ===============================
// JÁTÉK INDÍTÁSA
// ===============================

function startQuiz() {

    playerName = document.getElementById("playerName").value.trim();

    if (playerName === "") {
        alert("Kérlek, írd be a neved!");
        return;
    }

    if (selectedCategory === "") {
        alert("Kérlek, válassz kategóriát!");
        return;
    }

    if (selectedDifficulty === "") {
        alert("Kérlek, válassz nehézségi szintet!");
        return;
    }

    // Kérdések betöltése
    quizQuestions = [...questions[selectedCategory]];

    // Kérdések összekeverése
    quizQuestions.sort(() => Math.random() - 0.5);

    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
    wrongAnswers = 0;

    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("quizScreen").classList.remove("hidden");

    startTime = Date.now();

    timerInterval = setInterval(updateTimer, 1000);

    showQuestion();
}


// ===============================
// IDŐMÉRŐ
// ===============================

function updateTimer() {

    const elapsed = Math.floor((Date.now() - startTime) / 1000);

    document.getElementById("timer").textContent = elapsed;
}


// ===============================
// KÉRDÉS MEGJELENÍTÉSE
// ===============================

function showQuestion() {

    const questionData = quizQuestions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        `${currentQuestion + 1} / ${quizQuestions.length}`;

    document.getElementById("question").textContent =
        questionData.question;

    document.getElementById("score").textContent = score;

    const answersContainer = document.getElementById("answers");

    answersContainer.innerHTML = "";

    document.getElementById("nextButton").classList.add("hidden");

    questionData.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-button";

        button.textContent = answer;

        button.onclick = () => checkAnswer(index, button);

        answersContainer.appendChild(button);
    });
}


// ===============================
// VÁLASZ ELLENŐRZÉSE
// ===============================

function checkAnswer(selectedAnswer, selectedButton) {

    const questionData = quizQuestions[currentQuestion];

    const answerButtons =
        document.querySelectorAll(".answer-button");

    // Ne lehessen többször válaszolni
    answerButtons.forEach(button => {
        button.disabled = true;
    });


    // HELYES VÁLASZ
    if (selectedAnswer === questionData.correct) {

        selectedButton.classList.add("correct");

        correctAnswers++;

        score += 10;

    }

    // ROSSZ VÁLASZ
    else {

        selectedButton.classList.add("wrong");

        wrongAnswers++;

        // Megkeressük a helyes választ
        answerButtons[questionData.correct]
            .classList.add("correct");

    }


    document.getElementById("score").textContent = score;

    document.getElementById("nextButton")
        .classList.remove("hidden");
}


// ===============================
// KÖVETKEZŐ KÉRDÉS
// ===============================

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= quizQuestions.length) {
        finishQuiz();
    } else {
        showQuestion();
    }
}


// ===============================
// KVÍZ BEFEJEZÉSE
// ===============================

function finishQuiz() {

    clearInterval(timerInterval);

    const finalTime =
        Math.floor((Date.now() - startTime) / 1000);

    document.getElementById("quizScreen")
        .classList.add("hidden");

    document.getElementById("resultScreen")
        .classList.remove("hidden");

    document.getElementById("resultName")
        .textContent = playerName;

    document.getElementById("correctAnswers")
        .textContent = correctAnswers;

    document.getElementById("wrongAnswers")
        .textContent = wrongAnswers;

    document.getElementById("finalScore")
        .textContent = score;

    document.getElementById("finalTime")
        .textContent = finalTime;
}
