// admin.js

const jsonTextbox = document.querySelector('textarea#id_json')
const json = jsonTextbox.value
const answers = JSON.parse(json)
console.log(answers)
let html = "<div class='build-xr-answer--wrapper'>"

for(let i in answers) {
    const a = answers[i]
    const { type } = answers[i]
    html += "<h3>Q" + (parseInt(i) + 1) + " " + a.question + "?</h3>"

    if(type === 1) { // TEXTBOX
        html += "<p>" + a.answer + "</p>"
    } else if(type === 2) {
        const choices = a.choices
        html += "<ul>"
        for(j in choices) {
            const choice = choices[j]
            const multiChoiceAnswers = new Set(a.answer)
            const isChecked = multiChoiceAnswers.has(j)
            html += "<li><span class='checked'>" + (isChecked ? "x" : " ") + "</span>" + choice + "</li>"
        }
        html += "</ul>"
    } else if(type === 3) {
        const { answer } = a
        for(let p of answer.split('\n')) {
            html += "<p>" + p + "</p>"
        }
    }
}

html += "</div>"

jsonTextbox.parentNode.innerHTML = html
