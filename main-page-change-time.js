import { formatTime } from "./format-time-function";

const gameTimeFields = document.querySelectorAll('span[data-mlb-test="gameStateContainerMobile"]');

for (let gameTime of gameTimeFields){
    if (!isNaN(+gameTime.textContent[0])) {
        gameTime.textContent = formatTime(gameTime.textContent);
    }
}