'use strict'

import Field from './field.js';
import * as sound from './sound.js';

// Builder Pattern 
export default class GameBuilder {
    withGameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }
    withCarrotCount(num) {
        this.carrotCount = num;
        return this;
    }
    withBugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration,//
            this.carrotCount,//
            this.bugCount
        )
    }

}

class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;


        this.gameTimer = document.querySelector(".game__timer");
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector(".game__button");
        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
                this.stop();

            } else {
                this.start();
            }
        });

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    start() {
        this.started = true;
        this.initGame();
        this.showStopBtn();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBg()
    }

    stop() {
        this.started = false;
        this.stopGameTimer();
        this.hideGameBtn();
        sound.playAlert();
        sound.stopBg();
        this.onGameStop && this.onGameStop('cancel');
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    finishGame(win) {
        this.started = false;
        this.stopGameTimer();
        this.hideGameBtn();
        sound.stopBg()
        if (win) {
            sound.playWin();
        } else {
            sound.playBug();
        }
        this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
    }



    onItemClick = (item) => {
        if (!this.started) {
            return;
        }
        if (item === 'carrot') {
            this.score++;
            this.updateScoreBoard();
            if (this.score === this.carrotCount) {

                this.finishGame(true);
            }

        } else if (item === 'bug') {
            this.finishGame(false);
        }

    }


    updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }


    showStopBtn() {
        const icon = this.gameBtn.querySelector('.play');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }

    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }

    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.finishGame(this.carrotCount === this.score);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000)
    }

    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.innerText = `${minutes}:${seconds}`;
    }

    stopGameTimer() {
        clearInterval(this.timer)
    }

    hideGameBtn() {
        this.gameBtn.style.visibility = 'hidden';
    }


    initGame() {
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();

    }


}