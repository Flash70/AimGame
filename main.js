const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time_list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#fcba03', '#fc0703', '#20fc03', '#03fcb5', '#03e3fc', '#fc03c2']
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', evt => {
    if (evt.target.classList.contains('time-btn')) {
        time = parseInt(evt.target.getAttribute('data-time'));
        startGame();
    }
})

board.addEventListener('click', evt => {
    if (evt.target.classList.contains('circle')) {
        score++;
        evt.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    screens[1].classList.add('up');
    setInterval(decTime, 1000);
    createRandomCircle();
    setTime(time);
}
function decTime() {
    if (time === 0) {
        finishGame()
    }else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}
function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Ваш счет: <span class='primary'>${score}</span></h1>`
}
function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    circle.classList.add('circle');
    circle.style.width =`${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`
    board.append(circle);
    setColor(circle)
}
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min));
}

function setColor(element) {
    const color = getRandomColor()
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index]
}