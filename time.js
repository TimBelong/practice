// setInterval(logClockTime, 1000);

// function logClockTime() {
//     // Получение строки показания часов в формате гражданского времени
//     let time = getClockTime();

//     //Очистка показаний консоли и вывод показания часов
//     console.clear();
//     console.log(time);
// }

// function getClockTime() {
//     // Получение текущего времени

//     let date = new Date ();
//     let time = '';

//     // Выстраивание последовательности показаний часов
//     time = {
//         hours: date.getHours(),
//         minutes: date.getMinutes(),
//         seconds: date.getSeconds(),
//         ampm: 'AM'
//     }

//     if(time.hours == 12) {
//         time.ampm = 'PM';
//     } else if (time.hours > 12) {
//         time.ampm = "PM";
//         time.hours -= 12;
//     }

//     // Подстановка 0 к показанию часов, чтобы получалась пара цифр
//     if (time.hours < 10)
//         time.hours = '0' + time.hours;
//     // Подстановка 0 к показанию минут, чтобы получалась пара цифр
//     if (time.minutes < 10)
//         time.minutes = '0' + time.minutes;
//     // Подстановка 0 к показанию секунд, чтобы получалась пара цифр
//     if(time.seconds < 10)
//         time.seconds = '0' + time.seconds;

//     // Придание показаниям часов формата строки "hh:mm:ss tt"
//     return `${time.hours}: ${time.minutes}: ${time.seconds} ${time.ampm}`
// }



const oneSecond = () => 1000
const getCurrentTime = () => new Date()
const clear = () => console.clear()
const log = message => console.log(message)

// Функция которая принимает объект дата и возвращает объект, который содержит часы минуты и секунды
const abstractClockTime = date => ({
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
})

//Функция принимает объект показания часов и возвращает объект в котором показания приобразуются в формате 
//гражданского времени
const civilianHours = clockTime => ({
        ...clockTime,
        hours: (clockTime.hours > 12) ? clockTime.hours - 12 : clockTime.hours
})

//Добавляем к объекту показатель AM PM
const appendAMPM = clockTime => ({
        ...clockTime,
        ampm: (clockTime.hours >= 12) ? "PM" : "AM"
})

// Принимаем целевую функцию и возвращаем функцию, которая передает время в адрес цели. Целью является console.log
const display = target => time => target(time)

// Принимаем шаблонную строку hh:mm:ss: tt  и используем ее для возврата показания часов. 
const formatClock = format =>
    time =>
        format.replace("hh", time.hours)
            .replace("mm", time.minutes)
            .replace("ss", time.seconds)
            .replace("tt", time.ampm)

// Принимаем ключ объекта в качестве аргумента. Добавляем 0 к значению, если оно меньше 10
const prependZero = key => clockTime => ({
        ...clockTime,
        [key]: (clockTime[key] < 10) ? "0" + clockTime[key] : clockTime[key]
})

const compose = (...fns) => (arg) =>
    fns.reduce(
        (composed, f) => f(composed),
        arg
)

const convertToCivilianTime = clockTime => 
    compose(
        appendAMPM,
        civilianHours
    )(clockTime);

const doubleDigits = civilianTime => 
    compose (
        prependZero('hours'),
        prependZero('minutes'),
        prependZero('seconds')
    ) (civilianTime);


    const startTicking = () =>
    setInterval(
        compose(
            clear,
            getCurrentTime,
            abstractClockTime,
            convertToCivilianTime,
            doubleDigits,
            formatClock("hh:mm:ss tt"),
            display(log)
        ),
        oneSecond()
    )

startTicking()