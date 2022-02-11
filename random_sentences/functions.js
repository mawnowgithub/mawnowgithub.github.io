const baseURL = "https://www.wordreference.com/es/translation.asp?tranword="

const init = () => {
	let report = { sentences: [], correct: 0 }
	let answerData = {}
	let sessionControl = {
		turns: 0,
		currentTurn: 0,
	}

	const tenses = ["present", "past"]
	const forms = ["positive", "negative"]
	const prepositions = "in the"

	const affirmative = [true, false]
	const singular = [true, false]

	const subjects = [
		["doctor", "doctors"],
		["lawyer", "lawyers"],
		["nurse", "nurses"],
		["technician", "technicians"],
		["insurance Agent", "insurance agents"],
		["boxer", "boxers"],
		["painter", "painters"],
		["judge", "judges"],
		["chef", "chefs"],
		["golfer", "golfers"],
		["referee", "referees"],
		["tennis player", "tennis players"],
		["waiter", "waiters"],
		["worker", "workers"],
		["chemist", "chemists"],
		["archaelogist", "archaeologists"],
		["soccer player", "soccer players"],
		["pastor", "pastors"],
		["cheerleader", "cheerleaders"],
		["reporter", "reporters"],
		["teacher", "teachers"],
		["clown", "clowns"],
		["musician", "musicians"],
		["farmer", "farmers"],
		["photographer", "photographers"],
		["basketball player", "basketball players"],
		["taxi driver", "taxi drivers"],
		["grandfather", "grandfathers"],
		["grandmother", "grandmothers"],
		["uncle", "uncles"],
		["aunt", "aunts"],
		["father", "fathers"],
		["mother", "mothers"],
		["father", "parents"],
		["mother", "parents"],
		["cousin", "cousins"],
		["sister-in-law", "sisters-in-law"],
		["brother", "brothers"],
		["sister", "sisters"],
		["wife", "wives"],
		["husband", "husbands"],
		["niece", "nieces"],
		["nephew", "nephews"],
		["son", "sons"],
		["child", "children"],
		["daughter", "daughters"],
		["son-in-law", "sons-in-law"],
		["granddaugter", "granddaughter"],
		["grandson", "grandsons"],
		["tiger", "tigers"],
		["panda", "pandas"],
		["cheetah", "cheetahs"],
		["horse", "horses"],
		["lion", "lions"],
		["camel", "camels"],
		["donkey", "donkeys"],
		["tortoise", "tortoises"],
		["giraffe", "giraffes"],
		["gorilla", "gorillas"],
		["hippo", "hippos"],
		["dog", "dogs"],
		["cat", "cats"],
		["pig", "pigs"],
		["cow", "cows"],
		["mouse", "mice"],
		["koala", "koalas"],
		["elephant", "elephants"],
		["rabbit", "rabbits"],
		["rhino", "rhinos"],
	]

	const answers = {
		present: {
			positive: {
				singular: ["is"],
				plural: ["are"],
			},
			negative: {
				singular: ["is not", "isn't"],
				plural: ["are not", "aren't"],
			},
		},
		past: {
			positive: {
				singular: ["was"],
				plural: ["were"],
			},
			negative: {
				singular: ["was not", "wasn't"],
				plural: ["were not", "weren't"],
			},
		},
	}

	const places = [
		"bedroom",
		"kitchen",
		"basement",
		"bathroom",
		"attic",
		"nursery (room)",
		"home office",
		"living room",
		"dining room",
		"laundry (room)",
		"garage",
	]

	const emotions = [
		"happy",
		"sad",
		"bored",
		"afraid",
		"amused",
		"angry",
		"annoyed",
		"appalled",
		"astonished",
		"awed",
		"brooding",
		"quarrelsome",
		"composed",
		"confused",
		"curious",
		"contented",
		"delighted",
		"depressed",
		"determined",
		"disappointed",
		"disgusted",
		"exhausted",
		"exhilarated",
		"grateful",
		"hateful",
		"hysterical",
		"hopeful",
		"indignant",
		"modest",
		"satisfied",
		"serene",
		"shy",
		"sneaky",
		"silly",
		"surprised",
		"weepy",
		"withdrawn",
	]

	const randomValue = (data, singular = null) => {
		let max = data.length - 1
		let min = 0
		let number = Math.round(Math.random() * (max - min))
		if (singular != null) {
			if (singular) {
				return data[number][0]
			} else {
				return data[number][1]
			}
		} else {
			return data[number]
		}
	}

	const randomSentence = () => {
		let isAffirmative = randomValue(affirmative)
		let isSingular = randomValue(singular)

		if (isAffirmative) {
			interrogativeInput.classList.add("hidden")
			interrogativeMark.classList.add("hidden")
			notInterrogativeInput.classList.add("active")
			article.classList.add("capital-letter")
		} else {
			notInterrogativeInput.classList.add("hidden")
			interrogativeInput.classList.add("active")
			formTwoContainer.innerHTML = " - interrogative"
		}

		if (isSingular) {
			article.innerHTML = "a"
		} else {
			article.innerHTML = "the"
		}

		let theTense = randomValue(tenses)
		let theForm = randomValue(forms)
		tenseOneContainer.innerHTML = theTense
		formOneContainer.innerHTML = theForm
		subjectOneContainer.innerHTML = newAnchor(randomValue(subjects, isSingular))
		placeOneContainer.innerHTML = newAnchor(randomValue(places))
		emotionOneContainer.innerHTML = newAnchor(randomValue(emotions))
		placePreposition.innerHTML = prepositions

		answerData = {
			isSingular: isSingular,
			tense: theTense,
			form: theForm,
		}
	}

	const newAnchor = (term) => {
		return (
			'<a class="word-anchor" href="' +
			baseURL +
			term +
			'" target="_blank">' +
			term +
			"</a>"
		)
	}

	const nextSentence = () => {
		checkAnswer()
		turnUpdate()
		interrogativeInput.classList.remove("hidden", "active")
		interrogativeMark.classList.remove("hidden")
		notInterrogativeInput.classList.remove("hidden", "active")
		formTwoContainer.innerHTML = ""
		article.classList.remove("capital-letter")
		interrogativeInput.value = ""
		notInterrogativeInput.value = ""

		randomSentence()
	}

	const getInputValue = () => {
		let input = document.getElementsByClassName("input active")[0].value
		return input
	}

	const checkAnswer = () => {
		const { isSingular, tense, form } = answerData

		let number = isSingular ? "singular" : "plural"
		let correctAnswer = answers[tense][form][number]
		let inputValue = getInputValue().toLowerCase()
		let correct = false

		if (correctAnswer.includes(inputValue)) {
			correct = true
		}

		let words = document.getElementsByClassName("word")
		let wordsContent = ""

		Array.prototype.forEach.call(words, (word) => {
			let value = ""
			let hidden = word.classList.contains("hidden")
			if ("value" in word && !hidden) {
				if (word.value.trim() != "") {
					console.log("the value is: " + word.value)
					value = word.value
				} else {
					value = "_________"
					console.log("the value is: " + value)
				}

				wordsContent = wordsContent + " " + value
			} else if (!hidden) {
				wordsContent = wordsContent + " " + word.innerHTML
			}
		})

		let toReport = {
			sentences: [wordsContent, correctAnswer],
			correct: correct,
		}

		reportGrade(toReport)
	}

	const reportGrade = (data) => {
		report.sentences.push(data.sentences)
		if (data.correct) {
			report.correct++
		}
	}

	const viewReport = () => {
		checkAnswer()
		finalReport.classList.remove("hidden")
		sentencesPanel.classList.add("hidden")
		let reportBody = document.getElementById("report-body")
		let reportGrades = document.getElementById("report-grades")

		console.log(report)
		let reportBodyHtml = "<ol>"
		for (sentences of report.sentences) {
			let options = sentences[1].join(", ")
			reportBodyHtml +=
				"<li> <b> Your answer was</b>:" +
				sentences[0] +
				"<br/> <b>The correct options were: </b>" +
				options +
				"</li>"
		}
		reportBodyHtml += "</ol>"
		let correctness = parseInt(report.correct) / parseInt(sessionControl.turns)
		let gradesClass = ""

		if (correctness >= 0.75) {
			gradesClass = "good"
		} else if (correctness >= 0.5 && correctness < 0.75) {
			gradesClass = "average"
		} else if (correctness < 0.5) {
			gradesClass = "low"
		}
		reportGrades.classList.add(gradesClass)
		reportGrades.innerHTML = "You got " + report.correct + " correct sentences"
		reportBody.innerHTML = reportBodyHtml
	}

	const startTest = () => {
		let checks = document.querySelectorAll(".quantity-option")
		let quantity = 0

		Array.prototype.forEach.call(checks, (check) => {
			if (check.checked) {
				quantity = parseInt(check.value)
			}
		})

		sessionControl.turns = quantity
		turnUpdate()
		sessionConfigPanel.classList.add("hidden")
		sentencesPanel.classList.remove("hidden")
	}

	const restart = () => {
		let inputs = document.getElementsByClassName("input")
		Array.prototype.forEach.call(inputs, (input) => {
			input.value = ""
		})
		location.reload()
	}

	const turnUpdate = () => {
		let total = sessionControl.turns
		sessionControl.currentTurn = ++sessionControl.currentTurn
		if (sessionControl.currentTurn === total) {
			nextButton.classList.add("hidden")
			finishButton.classList.remove("hidden")
		}
		totalCount.innerHTML = total
		currentCount.innerHTML = sessionControl.currentTurn
	}

	const endSession = (isCancelling = true) => {
		if (isCancelling) {
			console.log("please don't")
		} else {
		}
	}

	//execution

	const tenseOneContainer = document.getElementById("tense-1")
	const formOneContainer = document.getElementById("form-1")
	const formTwoContainer = document.getElementById("form-2")
	const article = document.getElementById("article")
	const subjectOneContainer = document.getElementById("subject-1")
	const placeOneContainer = document.getElementById("place-1")
	const emotionOneContainer = document.getElementById("emotion-1")
	const interrogativeInput = document.getElementById("interrogative")
	const notInterrogativeInput = document.getElementById("not-interrogative")
	const interrogativeMark = document.getElementById("interrogative-mark")
	const placePreposition = document.getElementById("place-preposition")
	const sessionConfigPanel = document.getElementById("session-config-panel")
	const sentencesPanel = document.getElementById("sentences-panel")
	const currentCount = document.getElementById("current-count")
	const totalCount = document.getElementById("total-count")
	const finalReport = document.getElementById("report")

	const startButton = document.getElementById("start")
	const nextButton = document.getElementById("next")
	const finishButton = document.getElementById("finish")
	const restartButton = document.getElementById("restart")

	nextButton.addEventListener("click", nextSentence)
	finishButton.addEventListener("click", viewReport)
	startButton.addEventListener("click", startTest)
	restartButton.addEventListener("click", restart)

	randomSentence()
}

document.addEventListener("DOMContentLoaded", () => {
	init()
})
