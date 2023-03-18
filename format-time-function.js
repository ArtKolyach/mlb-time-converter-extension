'use strict'

export const formatTime = (oldTimeStamp) => {

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
