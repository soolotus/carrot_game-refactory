'use strict';

import PopUp from './popUp.js';
import GameBuilder from './game.js';


const gameFinishBanner = new PopUp();


const game = new GameBuilder()
    .withGameDuration(5)
    .withCarrotCount(3)
    .withBugCount(3).build();
game.setGameStopListener((reason) => {
    console.log(reason);
    let message;
    switch (reason) {
        case 'cancel':
            message = 'Replay??';
            break;
        case 'win':
            message = 'YOU WON🎉'
            break;
        case 'lose':
            message = 'YOU LOST'
            break;
        default:
            throw new Error('not valid reason')
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
    game.start();
});







// 'use strict'

// const CARROT_SIZE = 80;
// const CARROT_COUNT = 5;
// const BUG_COUNT = 5;
// const GAME_DURATION_TIME = 5;
// const field = document.querySelector(".game__field");
// const fieldRect = field.getBoundingClientRect();
// const gameBtn = document.querySelector(".game__button");
// const gameTimer = document.querySelector('.game__timer');
// const gameScore = document.querySelector('.game__score');

// const popUp = document.querySelector('.pop-up');
// const popUpRefresh = document.querySelector('.pop-up__refresh');
// const popUpText = document.querySelector('.pop-up__message');

// let started = false;
// let score = 0;
// let timer = undefined;

// gameBtn.addEventListener('click', () => {
//     if (started) {
//         stopGame();
//     } else {
//         startGame();
//     }
//     started = !started;
// })

// function startGame() {
//     initGame();
//     showStopBtn();
//     showScoreAndTimer();
//     startTimer();
// }

// function stopGame() {
//     hideBtn();
//     stopTimer();
//     showPopUp('Replay?');

// }

// function hideBtn() {
//     gameBtn.style.visibility = 'hidden';
// }

// function stopTimer() {
//     clearInterval(timer);
// }

// function showPopUp(text) {
//     popUp.classList.remove('pop-up--hide');
//     popUpText.innerText = text;
// }

// function initGame() {
//     field.innerHTML = '';
//     gameScore.innerText = CARROT_COUNT;
//     addItem('carrot', CARROT_COUNT, 'img/carrot.png');
//     addItem('bug', BUG_COUNT, 'img/bug.png');
// }

// function showStopBtn() {
//     const icon = document.querySelector('.fa-play');
//     icon.classList.remove('fa-play');
//     icon.classList.add('fa-stop');
// }

// function showScoreAndTimer() {
//     gameTimer.style.visibility = 'visible';
//     gameScore.style.visibility = 'visible';
// }

// function startTimer() {
//     let remainingTimeSeconds = GAME_DURATION_TIME;
//     updateTimer(remainingTimeSeconds);
//     timer = setInterval(() => {
//         if (remainingTimeSeconds <= 0) {
//             clearInterval(timer);
//             return;
//         }
//         updateTimer(--remainingTimeSeconds);

//     }, 1000)

// }

// function updateTimer(sec) {
//     const minutes = Math.floor(sec / 60);
//     const seconds = sec % 60;
//     gameTimer.innerText = `${minutes}:${seconds}`;
// }

// function addItem(className, count, imgPath) {
//     for (let i = 0; i < count; i++) {
//         const x1 = fieldRect.width - CARROT_SIZE;
//         const y1 = fieldRect.height - CARROT_SIZE;
//         const item = document.createElement('img');
//         item.setAttribute('src', imgPath);
//         item.setAttribute('class', className);
//         item.style.position = 'absolute';
//         const x = Math.random() * x1;
//         const y = Math.random() * y1
//         item.style.left = `${x}px`
//         item.style.top = `${y}px`
//         field.appendChild(item);
//     }
// }