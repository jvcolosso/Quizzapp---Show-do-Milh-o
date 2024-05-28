const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
    content.style.display = "flex";
    contentFinish.style.display = "none";

    currentIndex = 0;
    questionsCorrect = 0;
    loadQuestion();
};

function nextQuestion(e) {
    const selectedAnswer = e.target;
    const isCorrect = selectedAnswer.getAttribute("data-correct") === "true";

    // Destacar a resposta selecionada
    if (isCorrect) {
        questionsCorrect++;
        selectedAnswer.classList.add("correct");
    } else {
        selectedAnswer.classList.add("incorrect");
    }

    // Encontrar e destacar a resposta correta
    const correctAnswer = document.querySelector("[data-correct='true']");
    correctAnswer.classList.add("correct");

    // Desativar a seleção das respostas após responder
    document.querySelectorAll(".answer").forEach((answer) => {
        answer.removeEventListener("click", nextQuestion);
    });

    // Verificar se há mais perguntas ou se é a última
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        setTimeout(loadQuestion, 2000); // Carregar próxima pergunta após 2 segundos
    } else {
        setTimeout(finish, 2000); // Chamar função finish após 2 segundos
    }
}

function finish() {
    textFinish.innerHTML = `Você Acertou ${questionsCorrect} de ${questions.length} questões`;
    content.style.display = "none";
    contentFinish.style.display = "flex";
}

function loadQuestion() {
    spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
    const item = questions[currentIndex];
    answers.innerHTML = "";
    question.innerHTML = item.question;

    item.answers.forEach((answer) => {
        const div = document.createElement("div");
        
        div.innerHTML = `<button class="answer" data-correct="${answer.correct}">
        ${answer.option}</button>`;
        answers.appendChild(div);
    });
    document.querySelectorAll(".answer").forEach((item) => {
        item.addEventListener("click", nextQuestion);
    });
}
loadQuestion();   

