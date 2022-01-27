const init = () => {
	let questionContainer = document.getElementById("question")
    let mainCounter=document.getElementById("counter")
	let counter = document.getElementById("counter__current")
	let currentQuestion = 0
	let totalQuestions = 0
	let timerContainer = document.getElementById("timer")
	let button = document.getElementById("start-button")
	const time = 50 // in seconds
	let timer = null
	let secondsTimer = null
	let seconds = 0
	let timerBar = document.getElementById("timer-bar")
	let proportion = 100 / time
	let timerBarMax = 100
    let info=document.getElementById("info")
    let remaining=document.getElementById("remaining")
    let numberQuestions=document.getElementById("number-questions")

	const questions = [
        "What is your job?", 
        "What responsibilities do you have at work",
        "What do you study?",
        "Do you like that subject?",
        "Where is your hometown?",
        "What is your hometown like?",
        "Where is your home?",
        "Is art popular in your country?",
        "What is your first memory of your childhood?",
        "Do you often use a computer?",
        "What is your daily routine?",
        "Who is your best friend?",
        "What's your favourite food?",
        "Are you a happy person?",
        "Do you like English?",
        "Why do you study English?"
    ]

	const changeQuestion = (question) => {
		questionContainer.innerHTML = question
	}

	const selectQuestion = () => {
		seconds = time
        timerBarMax= 100

		if (!questions[currentQuestion]) {
			clearInterval(timer)
            clearInterval(secondsTimer)		
			questionContainer.innerHTML = "You finished! Well done!<br> <strong>Now, send your recordings to your teacher!</strong>"
            questionContainer.classList.add("finished")
            mainCounter.classList.add("hidden")
            timerBar.classList.add("hidden")
            remaining.classList.add("hidden")
			return
		} 
		changeQuestion(questions[currentQuestion])
		currentQuestion++
		counter.innerHTML = currentQuestion
		clearInterval(secondsTimer)
		timeControl()
		secondsTimer = setInterval(timeControl, 1000)
	}

	const startTest = () => {
		selectQuestion()

		timer = setInterval(selectQuestion, time * 1000)

		button.remove()
        info.remove()
        timerBar.classList.remove("hidden")
        remaining.classList.remove("hidden")
        mainCounter.classList.remove("hidden")

	}

	const countSeconds = () => {
		timerContainer.innerHTML = seconds
		seconds--
	}

	const barControl = () => {
		timerBar.style.width = timerBarMax + "%"
		timerBarMax = timerBarMax - proportion
	}

	const timeControl = () => {
		countSeconds()
		barControl()
	}

	button.addEventListener("click", startTest)
	totalQuestions = questions.length
	document.getElementById("counter__total").innerHTML = totalQuestions
    numberQuestions.innerHTML=totalQuestions
}

document.addEventListener("DOMContentLoaded", () => {
	init()
})
