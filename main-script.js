const formatTime = (oldTimeStamp) => {

    let hour = Number(oldTimeStamp[0]);
    hour -= 4;

    let newTimeStamp
    if (hour < 0){
        hour = 24 + hour;
        newTimeStamp = hour + oldTimeStamp.slice(1, 5) + 'MSK';
    }
    else newTimeStamp = hour + oldTimeStamp.slice(1, 5) + 'MSK+1';

    return newTimeStamp;
}

const url = window.location.href;
const SCHEDULE_URL = 'https://www.mlb.com/schedule/';
const MAIN_PAGE_URL = 'https://www.mlb.com/';

const getQuerySelector = (url) => {
    if (url.includes(SCHEDULE_URL)) {
        return 'a[class$="gamedaylink"]';
    } else if (url === MAIN_PAGE_URL) {
        return 'span[data-mlb-test="gameStateContainerMobile"]';
    }
}

const changeTime = () => {
    const querySelector = getQuerySelector(url);

    if (!querySelector) return;

    const gameTimeFields = document.querySelectorAll(querySelector);

    for (let gameTime of gameTimeFields) {
        if (!isNaN(Number(gameTime.textContent[0]))) {
            gameTime.textContent = formatTime(gameTime.textContent);
        }
    }
    console.log('НАСЕРЕНО В formatAllTimes', url, querySelector);
}

window.onload = changeTime;
