
let distance = 0;
let timeLeft = 5.5;
let gameActive = false;
let timerId = null;

const runner = document.getElementById('runner');
const distanceEl = document.getElementById('distance');
const timerEl = document.getElementById('timer');
const messageEl = document.getElementById('message');

window.addEventListener('keydown', (event) => {
  
    if (event.code === 'Tab') {
        event.preventDefault();
        restartGame();
    }

    if (event.key === 'Enter') {
        if (!gameActive && distance === 0) {
            startGame();
        } else if (gameActive) {
            moveForward();
        }
    }

    if (event.code === 'Space' && gameActive) {
        jump();
    }

});

function startGame() {
    gameActive = true;
    messageEl.innerText = "רוץ! (ENTER לזוז, SPACE לקפוץ)";
    messageEl.style.color = "white";

    timerId = setInterval(() => {
        timeLeft -= 0.1;
        timerEl.innerText = timeLeft.toFixed(1);
        checkCollision();

        if (timeLeft <= 0) {
            endGame(false, "נגמר הזמן! נסה שוב. ⏱️");
        }
    }, 100);
}

function moveForward() {
    if (!gameActive) return;
    distance += 0.1;
    if (distance > 3) distance = 3;
    distanceEl.innerText = distance.toFixed(1);

    const position = (distance / 3) * 95;
    runner.style.left = position + '%';
    checkCollision();

    if (distance >= 3) {
        endGame(true);
    }
}

function jump() {
    if (runner.classList.contains('jumping')) return;
    runner.classList.add('jumping');
    setTimeout(() => {
        runner.classList.remove('jumping');
    }, 600);
}

// פונקציית עזר לבדיקת חפיפה בין שני אלמנטים
function isOverlapping(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top


      
    );
}



function checkCollision() {
    const runnerRect = runner.getBoundingClientRect();

    
    const obs1 = document.getElementById('obsticale').getBoundingClientRect();
    const obs2 = document.getElementById('niga').getBoundingClientRect();
    const obs3 = document.getElementById('idk').getBoundingClientRect();
    const obs4 = document.getElementById('something').getBoundingClientRect();
    const obs5 = document.getElementById('karin').getBoundingClientRect();
    const obs6 = document.getElementById('yusi').getBoundingClientRect();
    const obs7 = document.getElementById('coshi').getBoundingClientRect();
    if (isOverlapping(runnerRect, obs1) || isOverlapping(runnerRect, obs2) || isOverlapping(runnerRect, obs3)
        || isOverlapping(runnerRect, obs4) || isOverlapping(runnerRect, obs5) || isOverlapping(runnerRect, obs6) || isOverlapping(runnerRect, obs7)) {
        endGame(false, "אופס! פגעת בצריח. 💀");




    }

}


function endGame(isWin, msg) {
    gameActive = false;
    clearInterval(timerId);
    if (isWin) {
        messageEl.innerText = "ניצחת!! 🏆";
        messa.color = "lime";
    } else {
        messageEl.innerText = msg;
        messageEl.style.color = "#ff4d4d";
    }
}
function restartGame()  {
    clearInterval(timerId);



    distance = 0;
    timeLeft = 5.0;
    gameActive = false;
    timerId = null;

    
    distanceEl.innerText = "0.0";
    timerEl.innerText = "5.0";


    runner.style.left = '0%';


    messageEl.innerText = "לחץ ENTER כדי להתחיל";
    messageEl.style.color = "white";
}
