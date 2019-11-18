const btn = document.querySelector('.start');
const imgs = document.querySelectorAll('.select img');

const gameSummary = {
    games: 0,
    playerWin: 0,
    aiWin: 0,
    draws: 0,
};

const actualGame = {
    playerChoice: '',
    aiChoice: '',
    winner: '',
};

// PLAYER CHOICE 
function playerChoice() {
    imgs.forEach(eachImg => eachImg.classList.remove('active')); // remove border from each images in loop
    actualGame.playerChoice = this.dataset.option;
    this.classList.add('active');
    document.querySelector('[data-summary="your-choice"]').textContent = this.dataset.option;

};

// RANDOMIZE AI CHOICE
function aiChoice() {
    const choices = ['paper', 'rock', 'scissors'];
    const choicesIndex = Math.floor(Math.random() * choices.length);
    const aiChoice = choices[choicesIndex];
    document.querySelector('[data-summary="ai-choice"]').textContent = aiChoice;
    return aiChoice;
};


// COMPARISION 

function compare() {
    // PLAYER WIN
    if ((actualGame.playerChoice === 'paper' && actualGame.aiChoice === 'rock') || (actualGame.playerChoice === 'scissors' && actualGame.aiChoice === 'paper') || (actualGame.playerChoice === 'rock' && actualGame.aiChoice === 'scissors')) {
        document.querySelector('[data-summary="who-win"]').textContent = "You win!";
        gameSummary.playerWin++;
    } else if ((actualGame.aiChoice === 'paper' && actualGame.playerChoice === 'rock') || (actualGame.aiChoice === 'scissors' && actualGame.playerChoice === 'paper') || (actualGame.aiChoice === 'rock' && actualGame.playerChoice === 'scissors')) {
        document.querySelector('[data-summary="who-win"]').textContent = "You loss :(";
        gameSummary.aiWin++;
    } else {
        document.querySelector('[data-summary="who-win"]').textContent = "Draw";
        gameSummary.draws++;
    }
};

function displaySummary() {
    gameSummary.games++;
    document.querySelector('.panel-right .numbers span').textContent = gameSummary.games;
    document.querySelector('.panel-right .wins span').textContent = gameSummary.playerWin;
    document.querySelector('.panel-right .losses span').textContent = gameSummary.aiWin;
    document.querySelector('.panel-right .draws span').textContent = gameSummary.draws;

}

function endGame() {
    document.querySelector(`[data-option=${actualGame.playerChoice}]`).classList.remove('active');
    actualGame.playerChoice = '';
}

// CONTROL FUNCTION 

function gameInitiate() {
    if (!actualGame.playerChoice) return alert('Choose one option!'); // return ends 
    actualGame.aiChoice = aiChoice();
    compare();
    displaySummary();
    endGame();
}

imgs.forEach(img => img.addEventListener('click', playerChoice));
btn.addEventListener('click', gameInitiate);