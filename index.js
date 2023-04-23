
const questions = [
    {
        question: "Hvor mange dager finnes det i uka ?",
        optionA: "10 dager",
        optionB: "14 dager",
        optionC: "5 dager",
        optionD: "7 dager",
        correctOption: "optionD"
    },

    {
        question: "Hvor mange spillere er det på et fotballag? ?",
        optionA: "10 spillere",
        optionB: "11 spillere",
        optionC: "9 spillere",
        optionD: "12 spillere",
        correctOption: "optionB"
    },

    {
        question: "Hvem var norges første kvinnelige statsminister ?",
        optionA: "Donald Trump",
        optionB: "Erna Solberg",
        optionC: "Hege Bakkevik",
        optionD: "Gro Harlem Brundtland",
        correctOption: "optionD"
    },

  


    {
        question: "Oslo het tidligere?",
        optionA: "Bergen",
        optionB: "Løvheim",
        optionC: "Kristiania",
        optionD: "Bergen",
        correctOption: "optionC"
    },

    {
        question: "Hva er hovedstaden i Tyskland?",
        optionA: "Wien",
        optionB: "Ohio",
        optionC: "Hamburg",
        optionD: "Berlin",
        correctOption: "optionD"
    },

    {
        question: "Hva het Porsche sin første sportsbil?",
        optionA: "944",
        optionB: "356",
        optionC: "911",
        optionD: "Taycan",
        correctOption: "optionA"
    },

    {
        question: "Hvor mange planeter finnes i vårt solsystem ?",
        optionA: "11",
        optionB: "7",
        optionC: "9",
        optionD: "8",
        correctOption: "optionD"
    },

    {
        question: "Hvilken planet er den varmeste?",
        optionA: "Jupiter",
        optionB: "Merkur",
        optionC: "Jorda",
        optionD: "Venus",
        correctOption: "optionD"
    },

    {
        question: "Hva er hovedstaden i Colombia",
        optionA: "Colombia Republic",
        optionB: "Bogota",
        optionC: "Brunei",
        optionD: "Colombia city",
        correctOption: "optionB"
    },

    {
        question: "Hvor mange hjerter har en blekksprut?",
        optionA: "1",
        optionB: "2",
        optionC: "3",
        optionD: "4",
        correctOption: "optionC"
    },

    {
        question: "Hvor mange tenner har et voksent menneske?",
        optionA: "28",
        optionB: "30",
        optionC: "32",
        optionD: "36",
        correctOption: "optionC"
    }

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0 


function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {

            correctOption = option.labels[0].id
        }
    })


    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }


    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++
            
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ 
            indexNumber++
 
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}




function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
 
    setTimeout(() => {
        if (indexNumber <= 9) {

            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}


function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


function handleEndGame() {
    let remark = null
    let remarkColor = null


    if (playerScore <= 3) {
        remark = " UBRUKELIG, her må du jobbe mer!"
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Middels, du kan bedre enn dette!"
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Dritbra, fortsett sånn!."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100


    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}


function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}


function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}


