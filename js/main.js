const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let time = 59;
let point = 0;
var playing = false;
var lose = false;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    
    if (!playing){
        playing = true;
        setInterval(function() {
            if (time >= 0){
                document.getElementById("sec").innerHTML = time;
                if (point === 6){
                    document.location.reload(true);
                    alert("Felicidades!\nHas ganado 6/6");
                }
                time--;
            }else{
                lose = true;
                if (lose){
                    document.location.reload(true);
                    alert("Se acabó el tiempo :'(\n"+"Tu puntuacion final es: "+point);
                }
            }
        },1000);
    }

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
  point++;
  document.getElementById("point").innerHTML = point;
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));