console.log('НАСЕРЕНО НАД ИМПОРТОМ');
import { formatTime } from "./format-time-function";

const url = window.location.href;
const SCHEDULE_URL = 'https://www.mlb.com/schedule';
const MAIN_PAGE_URL = 'https://www.mlb.com/';

const getQuerySelector = (url) => {
    if (url === SCHEDULE_URL) {
        return 'a[class$="gamedaylink"]';
    } else if (url === MAIN_PAGE_URL) {
        return 'span[data-mlb-test="gameStateContainerMobile"]';
    }
}

const gameTimeFields = document.querySelectorAll(getQuerySelector(url));

export const formatAllTimes = () => {
    for (let gameTime of gameTimeFields) {
        if (!isNaN(+gameTime.textContent[0])) {
            gameTime.textContent = formatTime(gameTime.textContent);
        }
    }
    console.log('НАСЕРЕНО В formatAllTimes', url, getQuerySelector(url));
}
