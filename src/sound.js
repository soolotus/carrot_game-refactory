'use strict'

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');
const winSound = new Audio('./sound/game_win.mp3');



export function playCarrot() {
    palySound(carrotSound)
}
export function playBug() {
    palySound(bugSound)
}
export function playBg() {
    palySound(bgSound)
}
export function playAlert() {
    palySound(alertSound)
}
export function playWin() {
    palySound(carrotSound)
}

export function stopBg() {
    stopSound(bgSound)
}
function palySound(sound) {
    sound.currentTime = 0;
    sound.play();
}
function stopSound(sound) {
    sound.pause();
}