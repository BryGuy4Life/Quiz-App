"use strict";

const q1 = {
    question: 'How far does a Space Marine model move?',
    a1: {
        answer: '5 inches',
        correct: false
    },
    a2: {
        answer: '7 inches',
        correct: false
    },
    a3: {
        answer: '6 inches',
        correct: true
    },
    a4: {
        answer: '9 inches',
        correct: false
    }
}

const q2 = {
    question: 'What is the firing range of a lascannon?',
    a1: {
        answer: '48 inches',
        correct: true
    },
    a2: {
        answer: '52 inches',
        correct: false
    },
    a3: {
        answer: '36 inches',
        correct: false
    },
    a4: {
        answer: '47 inches',
        correct: false
    }
};

const q3 = {
    question: 'What is the toughness of a terminator?',
    a1: {
        answer: '3',
        correct: false
    },
    a2: {
        answer: '6',
        correct: false
    },
    a3: {
        answer: '5',
        correct: false
    },
    a4: {
        answer: '4',
        correct: true
    }
};

const q4 = {
    question: 'What is the minimum distance a flyer must move?',
    a1: {
        answer: '16 inches',
        correct: false
    },
    a2: {
        answer: '50 inches',
        correct: false
    },
    a3: {
        answer: '20 inches',
        correct: false
    },
    a4: {
        answer: 'Depends on the flyer data sheet',
        correct: true
    }
};

const q5 = {
    question: 'What is the minimum distance models in a unit must maintain to keep with in unit coherency?',
    a1: {
        answer: '1 inch',
        correct: false
    },
    a2: {
        answer: '2 inches',
        correct: true
    },
    a3: {
        answer: '3 inches',
        correct: false
    },
    a4: {
        answer: '1.5 inches',
        correct: false
    }
};

const q6 = {
    question: 'What is the strength value for commissar Yarrick?',
    a1: {
        answer: '3',
        correct: true
    },
    a2: {
        answer: '4',
        correct: false
    },
    a3: {
        answer: '5',
        correct: false
    },
    a4: {
        answer: '6',
        correct: false
    }
};

const q7 = {
    question: 'What is the ballistic skill of an ork burna boyz?',
    a1: {
        answer: '3+',
        correct: false
    },
    a2: {
        answer: '4+',
        correct: false
    },
    a3: {
        answer: '6',
        correct: false
    },
    a4: {
        answer: '5+',
        correct: true
    }
};

const q8 = {
    question: 'What is the Weapon Skill of a genestealer?',
    a1: {
        answer: '2+',
        correct: false
    },
    a2: {
        answer: '4+',
        correct: false
    },
    a3: {
        answer: '3+',
        correct: true
    },
    a4: {
        answer: '5+',
        correct: false
    }
};

const q9 = {
    question: 'What is maximum basic space marine capacity of a Land Raider?',
    a1: {
        answer: '10',
        correct: false
    },
    a2: {
        answer: '12',
        correct: true
    },
    a3: {
        answer: '8',
        correct: false
    },
    a4: {
        answer: '6',
        correct: false
    }
};

const q10 = {
    question: 'How many sides does the standard dice have that is to be used to make rolls throughout the game?',
    a1: {
        answer: '8',
        correct: false
    },
    a2: {
        answer: '20',
        correct: false
    },
    a3: {
        answer: '6',
        correct: true
    },
    a4: {
        answer: 'They use dice?',
        correct: false
    }
};

const questionHolder = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];

let currentQuestionIndex;
let correctAnswers;

// handle if an element should hide or be shown
const isHiddenDiv = (element, boolean) => {
    if (boolean === true) {
        element.hide();
    }
    if (boolean === false) {
        element.show();
    }
}

// entry point to app starting make sure elements are hidden
const hideDivs = (div1, div2) => {
    isHiddenDiv(div1, true);
    isHiddenDiv(div2, true);
}

const unHideDivs = (div1, div2) => {
    isHiddenDiv(div1, false);
    isHiddenDiv(div2, false);
}

// pure func to handle answer row
const getAnswerDiv = () => $(".a-row");

// pure func to handle progress row
const getProgDiv = () => $(".prog-row");

// pure func to handle question insert row
const getQuestionInsertDiv = () => $(".q-insert");

// pure func to handle answers insert row
const getAnswersInsertDiv = () => $(".a-insert");

// generate html for home template of quiz app
const generateHomeTemplate = () => {
    return `
    <h1>Warhammer 40k Rules Quiz Game</h1>
    <h2>Test your knowledge on how well you actually know the rules to the popular table top game by Games-Workshop: Warhammer 40k.</h2>
    <button class="btn-quiz" id="btn-start-quiz">Start The Quiz!</button>
`;
}

const generateResultsTemplate = (num) => `
    <h1>The Quiz is finished! Your Results Are:</h1>
    <h2>Correct: ${num}</h2>
    <h2>Incorrect: ${10 - num}</h2>
    <h2>Score: ${num}0%</h2>
    <button class="btn-quiz" id="btn-restart-quiz">Let Me Try Again!</button>
`;

// handle quesiton template
const generateQuestionTemplate = (qNum, question) => {
    return `
    <h1>Q: ${qNum}<h1>
    <h2>${question}<h2>
`;
}

const generateAnswerTemplate = (a1, a2, a3, a4) => {
    return `
    <div class="row">
        <label for="a1" class="answer-label">
            <div class="radio-img-holder">
                <input role="radiogroup" id="a1" type="radio" required name="answers" value="0">
                <img alt="image of a skull for the checkbox" src="img/skull_checkbox.png">
            </div>
            ${a1.answer}
        </label>
    </div>
    <div class="row">
        <label for="a2" class="answer-label">
            <div class="radio-img-holder">
                <input role="radiogroup" id="a2" type="radio" required name="answers" value="1">
                <img alt="image of a skull for the checkbox" src="img/skull_checkbox.png">
            </div>
            ${a2.answer}
        </label>
    </div>
    <div class="row">
        <label for="a3" class="answer-label">
            <div class="radio-img-holder">
                <input role="radiogroup" id="a3" type="radio" required name="answers" value="2">
                <img alt="image of a skull for the checkbox" src="img/skull_checkbox.png">
            </div>
            ${a3.answer}
        </label>
    </div>
    <div class="row">
        <label for="a4" class="answer-label">
            <div class="radio-img-holder">
                <input role="radiogroup" id="a4" type="radio" required name="answers" value="3">
                <img alt="image of a skull for the checkbox" src="img/skull_checkbox.png">
            </div>
            ${a4.answer}
        </label>
    </div>
`;
}

const generateCorrectAnswerTemplate = () =>
    `
<div class="cover-screen">
    <div class="pop-up">
        <div class="row">
            <div class="col-4 popup-img-insert">
                <img alt="Image to represent the answer was correct" src="img/correct-answer.jpg">
            </div>
            <div class="col-8 popup-a-insert">
                <h1>Correct!</h1>
                <h2>Lord Inquisitor is pleased with your answer!</h2>
                <button class="btn-quiz" id="btn-popup">Next Question, My Lord!</button>
            </div>
        </div>
    </div>
</div>
    `

const generateWrongAnswerTemplate = (showCorrectAnswer) =>
    `
<div class="cover-screen">
    <div class="pop-up">
        <div class="row">
            <div class="col-4 popup-img-insert">
                <img alt="Image to represent the answer was wrong" src="img/wrong-answer.jpg">
            </div>
            <div class="col-8 popup-a-insert">
                <h1>Wrong!</h1>
                <h2>You have failed your Lord Inquisitor! Do not let this happen again... Here is the correct answer.</h2>
                <h3>${showCorrectAnswer}</h3>
                <button class="btn-quiz" id="btn-popup">Next Question, My Lord!</button>
            </div>
        </div>
    </div>
</div>
    `

// handle inserting template's into parent divs
const insertDiv = (parentDiv, htmlTemplate) => {
    parentDiv.append(htmlTemplate);
}

const removePreviousDiv = (parentDiv) => {
    parentDiv.children().remove();
}

// handle the start of the web page opening insertion template
const quizAppEntry = () => {

    insertDiv(getQuestionInsertDiv(), generateHomeTemplate());

}

const addNewQuestion = (currentIndex) => {
    removePreviousDiv(getQuestionInsertDiv());
    const q = questionHolder[currentIndex];
    const qNum = currentQuestionIndex + 1;
    const question = q.question;
    const template = generateQuestionTemplate(qNum, question);
    insertDiv(getQuestionInsertDiv(), template);
}

const addNewAnswers = (currentIndex) => {
    removePreviousDiv(getAnswersInsertDiv());
    const q1 = questionHolder[currentIndex];
    const template = generateAnswerTemplate(q1.a1, q1.a2, q1.a3, q1.a4);
    insertDiv(getAnswersInsertDiv(), template);
}

const startQuiz = () => {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    unHideDivs(getAnswerDiv(), getProgDiv());
    removePreviousDiv(getQuestionInsertDiv());
    addNewQuestion(currentQuestionIndex);
    addNewAnswers(currentQuestionIndex);
    handleUiQuestionIndex();

}

const setupListenerForRestartBtn = () => {
    $("#btn-restart-quiz").click( () => {
        startQuiz();
    });
}

const handleStartQuiz = () => {

    $("#btn-start-quiz").click(function() {
       //start calling functions to load quesitons
        startQuiz();
        handleSubmitAnswerBtn();
    });
}

const handleSubmitAnswerBtn = () => {

    $("#btn-submit").click(function(e) {
        e.preventDefault();
        if ($("input[name=answers]:checked", "#quizForm").val() === undefined) {
            alert("Please choose an answer to continue the quiz");
        } else {
            gradeAnswer(getUserSelection(), getCurrentQuesiton(currentQuestionIndex));
        }

    });
}

const getUserSelection = () => $("input[name=answers]:checked", "#quizForm").val();

const getCurrentQuesiton = (num) => questionHolder[num];

const getCorrectAnswer = (keyArray) => {
    for (let obj in keyArray) {
        if (keyArray[obj].correct === true) {
            return keyArray[obj].answer;
            break;
        }
    }
}

const gradeAnswer = (userAnswer, currentQuestion) => {
    const keyArray = [currentQuestion.a1, currentQuestion.a2, currentQuestion.a3, currentQuestion.a4];
    for (let obj in keyArray) {
        const c = keyArray[obj].correct;
        if (userAnswer == obj) {
            if (c === true) {
                //correct
                console.log("correct");
                console.log(`Before inc - ${correctAnswers}`);
                correctAnswers++;
                console.log(`After inc - ${correctAnswers}`);
                $('body').append(generateCorrectAnswerTemplate());
                resultPopUpBtnListener();
            } else {
                //wrong
                console.log("wrong");
                let showCorrectAnswer = getCorrectAnswer(keyArray);
                $('body').append(generateWrongAnswerTemplate(showCorrectAnswer));
                resultPopUpBtnListener();
            }

            // check to make sure if we are at the end of the question list
            if ((currentQuestionIndex + 1) == questionHolder.length) {
                //show results div process here
                console.log(`End - ${correctAnswers}`);
                removePreviousDiv(getQuestionInsertDiv());
                hideDivs(getAnswerDiv(), getProgDiv());
                insertDiv(getQuestionInsertDiv(), generateResultsTemplate(correctAnswers));
                setupListenerForRestartBtn();
            } else {
                // keep cycling questions
                changeQuestion();
            }

        }

    }
}

//show the user what the correct answer is
const resultPopUpBtnListener = () => {
    $("#btn-popup").click(() => {
        $("body").find(".cover-screen").remove();
    })
}

// after the user answer is graded change to the next question with this function
const changeQuestion = () => {
    console.log(`inside changeQuestion - ${correctAnswers}`);
    currentQuestionIndex++;
    addNewQuestion(currentQuestionIndex);
    addNewAnswers(currentQuestionIndex);
    handleUiQuestionIndex();
}

const handleUiQuestionIndex = () => {
    $(".q-index").text(`Question: ${currentQuestionIndex + 1} of 10`);
}

//function to start series of functions created above
const run = () => {
    //place all created running functions in order here
    hideDivs(getAnswerDiv(), getProgDiv());
    quizAppEntry();
    handleStartQuiz();
}

//start JS when DOM ready
$(run)


