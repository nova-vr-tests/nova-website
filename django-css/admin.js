// admin.js

const jsonTextbox = document.querySelector('textarea#id_json')
const json = jsonTextbox.value
const answers = JSON.parse(json)
console.log(answers)
let html = ""

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
            html += "<li>" + choice + " / " + (isChecked ? "CHECKED" : "") + "</li>"
        }
        html += "</ul>"
    }

}

jsonTextbox.parentNode.innerHTML = html
