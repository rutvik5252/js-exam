const questions = [
    {
        que: "Which of the following is a markup language?",
        a: "HTML",
        b: "CSS",
        c: "JavaScript",
        d: "PHP",
        correct: "a",
    },
    {
        que: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    {
        que: "What does CSS stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "JavaScript Object Notation",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "b",
    },
    {
        que: "Which language is used for styling web pages?",
        a: "HTML",
        b: "CSS",
        c: "JavaScript",
        d: "PHP",
        correct: "b",
    },
    {
        que: "Which tag is used to define a hyperlink in HTML?",
        a: "<a>",
        b: "<link>",
        c: "<href>",
        d: "<hyperlink>",
        correct: "a",
    },
    {
        que: "Which company developed JavaScript?",
        a: "Netscape",
        b: "Microsoft",
        c: "Sun Microsystems",
        d: "Apple",
        correct: "a",
    },
    {
        que: "What is the full form of HTTP?",
        a: "HyperText Transmission Protocol",
        b: "HyperText Transfer Protocol",
        c: "HyperType Text Protocol",
        d: "HyperTool Transfer Protocol",
        correct: "b",
    },
    {
        que: "What does the 'DOM' in web development stand for?",
        a: "Document Object Model",
        b: "Data Object Model",
        c: "Document Oriented Model",
        d: "Data Oriented Model",
        correct: "a",
    },
    {
        que: "Which programming language is known as the 'language of the web'?",
        a: "Python",
        b: "Ruby",
        c: "JavaScript",
        d: "Java",
        correct: "c",
    },
    {
        que: "Which tag is used to define an unordered list in HTML?",
        a: "<ul>",
        b: "<ol>",
        c: "<li>",
        d: "<list>",
        correct: "a",
    },
];

let index = 0;
let total = questions.length;
let right = 0, wrong = 0;
let timer;
let timeLeft = 30; 

const quebox = document.getElementById("quebox");
const optionInput = document.querySelectorAll(".options");
const nextButton = document.getElementById("nextButton");
const submitButton = document.getElementById("submitButton");
const timerDisplay = document.getElementById("timer");

const loadQuestion = () => {
    if (index === total) {
        return endQuiz();
    }
    reset();
    let data = questions[index];
    quebox.innerHTML = `${index + 1}) ${data.que}`;
    optionInput[0].nextElementSibling.innerText = data.a;
    optionInput[1].nextElementSibling.innerText = data.b;
    optionInput[2].nextElementSibling.innerText = data.c;
    optionInput[3].nextElementSibling.innerText = data.d;

    timeLeft = 30;
    timerDisplay.innerText = timeLeft;
    clearInterval(timer);  
    startTimer();  

    if (index === total - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
    }
};

const startTimer = () => {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(); 
        } else {
            timeLeft--;
            timerDisplay.innerText = timeLeft;
        }
    }, 1000); 
};

const submitQuiz = () => {
    const data = questions[index];
    const ans = getAnswer();
    if (ans === data.correct) {
        right++;
    } else {
        wrong++;
    }
    index++;
    loadQuestion();
};

const nextQuestion = () => {
    submitQuiz();
};

const getAnswer = () => {
    let answer;
    optionInput.forEach((input) => {
        if (input.checked) {
            answer = input.value;
        }
    });
    return answer;
};

const reset = () => {
    optionInput.forEach((input) => {
        input.checked = false;
    });
};

const endQuiz = () => {
    document.getElementById("box").innerHTML = `
        <h3>Congratulations!</h3>
        <h2>${right}/${total} Are Correct</h2>
        <button class="btn restart-btn" type="button" onclick="restartQuiz()">Restart</button>
    `;
};

const restartQuiz = () => {
    index = 0;
    right = 0;
    wrong = 0;
    loadQuestion();
};

loadQuestion();
