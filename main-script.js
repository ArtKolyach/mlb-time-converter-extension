// Convert to 24h format
const convertTo24HourFormat = (hours, AmPm) => {
    switch (AmPm) {
        case 'PM':
            if (hours !== 12) hours += 12;
            break;
        case 'AM':
            if (hours === 12) hours = 0;
            break;
    }
    return hours;
}


// Convert String time to Date
const convertToDate = (timeText) => {
    const timeTextSplit = timeText.split(' ');
    const AmPm = timeTextSplit[1];

    const timeHoursAndMinutes = timeTextSplit[0].split(':');
    let hours = Number(timeHoursAndMinutes[0]);
    const minutes = Number(timeHoursAndMinutes[1]);

    hours = convertTo24HourFormat(hours, AmPm);

    return new Date(new Date().setHours(hours, minutes, 0, 0));
}


// Get timezone offset in minutes
const ET_TO_UTC_DIFF_IN_MIN = 300;
const LocalToUTC = new Date().getTimezoneOffset();
const ETtoLocal = ET_TO_UTC_DIFF_IN_MIN - LocalToUTC;
console.log(ETtoLocal);


// Convert Date to local time Date
const convertETToLocal = (date) => {
    const convertedDate = new Date(date);
    convertedDate.setMinutes(date.getMinutes() + ETtoLocal);
    return new Date(convertedDate);
}


// Get timezone name if there is one
const getTimezoneName = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezoneSplit = timezone.split('/');
    if (timezoneSplit[1]) return timezoneSplit[1];
    else if (timezoneSplit[0]) return timezoneSplit[0];
    else return '';
}


// Convert Date back to String time
const convertDateToTimeText = (date) => {
    const splitDate = date.toTimeString().split(':');
    const hoursAndMinutes = splitDate[0] + ':' + splitDate[1];

    let timeText = hoursAndMinutes + ' ' + getTimezoneName();

    if (dayHasChanged) timeText = '*' + timeText;
    return timeText.toUpperCase();
}

let dayHasChanged = false; // Day has changed by timezone offset or not variable


// MAIN FORMATTING FUNCTION
const formatTime = (oldTimeStamp) => {
    const oldDate = convertToDate(oldTimeStamp);

    const localOldDate = convertETToLocal(oldDate);

    dayHasChanged = localOldDate.getDate() !== oldDate.getDate();

    return convertDateToTimeText(localOldDate);

}


// Get query selector for current page
const url = window.location.href;
const SCHEDULE_URL = 'https://www.mlb.com/schedule';
const MAIN_PAGE_URL = 'https://www.mlb.com/';

const getQuerySelector = (url) => {
    if (url.includes(SCHEDULE_URL)) {
        return 'a[class$="gamedaylink"]';
    } else if (url === MAIN_PAGE_URL) {
        return 'span[data-mlb-test="gameStateContainerMobile"]';
    }
}


// GET TIME FIELDS AND CHANGE THEM
const changeTime = () => {
    const querySelector = getQuerySelector(url);

    if (!querySelector) return;

    const gameTimeFields = document.querySelectorAll(querySelector);

    if (!gameTimeFields[0]) {
        return;
    }

    for (let gameTime of gameTimeFields) {
        if (!isNaN(Number(gameTime.textContent[0]))) {
            gameTime.textContent = formatTime(gameTime.textContent);
        }
    }
}

// EXECUTION
window.onload = () => {
    changeTime();

    // Checking if page of schedule has been changed
    let grid = document.getElementById('gridWrapper');
    if (grid) {
        const config = {attributes: false, childList: true, subtree: false};
        const observer = new MutationObserver(changeTime);
        observer.observe(grid, config);
    }
}
