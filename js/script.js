'use strict';

var gNextId = 1;
var gQuests = createQuests()
var gCurrIdx = 0;
var gCorrectCount = 0;




function init() {
    renderQuest()

}

function renderQuest() {

    var elQuestContainer = document.querySelector('.quest-container')
    var currId = gQuests[gCurrIdx].id
    var strHtml = ''

    strHtml += `<img class="quest-img" src="./img/${currId}.jpg">`
    strHtml += `<div class="quest-text">${gQuests[gCurrIdx].quest}</div>`
    strHtml += `<div class="opt-container">`
    for (var i = 0; i < gQuests[gCurrIdx].opt.length; i++) {
        strHtml += `<div class="quest" onclick="optClicked(this,${i})"> ${gQuests[gCurrIdx].opt[i]}</div>`
    }
    strHtml += `</div>`
    elQuestContainer.innerHTML = strHtml;
}

function optClicked(elOpt, i) {

    if (checkAnswer(i)) {
        gCorrectCount++;
        elOpt.style.backgroundColor = 'green';
        gCurrIdx++;
    } else {
        elOpt.style.backgroundColor = 'red';
        gCurrIdx++;
    }
    if (gCurrIdx === gQuests.length && gQuests.length !== 0) {
        setTimeout(endGame, 1000)
    } else {
        setTimeout(renderQuest, 1000)
    }
}


function checkAnswer(optIdx) {
    return (gQuests[gCurrIdx].correctIdx === optIdx);
}

function createQuest(opt, correctIdx, quest) {
    var newQuest = {
        id: gNextId++,
        opt: opt,
        correctIdx: correctIdx,
        quest: quest
    }
    return newQuest;
}

function createQuests() {
    var quests = []
    quests.push(createQuest(['Sanchez', 'Williams'], 0, 'What is Rick\'s last name?'))
    quests.push(createQuest(['Squanchy', 'Mr. Meeseeks'], 1, 'What\'s the name of this happy-go-lucky blue colored creature?'))
    quests.push(createQuest(['C-137', 'C-142'], 0, 'What is Rick\'s \"universe number?\"'))
    quests.push(createQuest(['Mr. Jellybean', 'Noob Noob'], 1, 'Who is in the picture?'))
    return quests;
}


function endGame() {
    var elPlayAgain = document.querySelector('.play-again')
    var elQuestContainer = document.querySelector('.quest-container')
    var elText = document.querySelector('.text')
    elQuestContainer.style.display = 'none';
    elPlayAgain.style.display = 'block';
    var questAmount = gQuests.length
    elText.innerHTML = `Your Score: ${gCorrectCount}/${questAmount}`
    gCurrIdx = 0;
    gCorrectCount = 0;


}

function playAgain() {
    var elPlayAgain = document.querySelector('.play-again')
    var elQuestContainer = document.querySelector('.quest-container')
    elPlayAgain.style.display = 'none';
    elQuestContainer.style.display = 'block';
    renderQuest()
}