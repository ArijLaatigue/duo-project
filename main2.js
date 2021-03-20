function  MixOrMatch() {
    var mixOrMatch= {} 
        mixOrMatch.busy = true;
        mixOrMatch.matchedCards = [];
        mixOrMatch.timeRemaining = totalTime;
        mixOrMatch.totalClicks = 0;
        mixOrMatch.cardToCheck=null;
        mixOrMatch.cardsArray = cards;
        mixOrMatch.totalTime = totalTime;
        mixOrMatch.timeRemaining = totalTime;
        mixOrMatch.timer = document.getElementById('time-remaining');
        mixOrMatch.ticker = document.getElementById('flips');
        mixOrMatch.startGame=startGame;
        mixOrMatch.hideCards=hideCards;
        mixOrMatch.flipCard=flipCard;
        mixOrMatch.checkForCardMatch=checkForCardMatch;
        mixOrMatch.cardMatch=cardMatch;
        mixOrMatch.cardMisMatch=cardMisMatch;
        mixOrMatch.getCardType=getCardType;
        mixOrMatch.startCountDown=startCountDown;
        mixOrMatch.gameOver=gameOver;
        mixOrMatch.victory=victory;
        mixOrMatch.shuffleCards=shuffleCards;
        mixOrMatch.canFlipCard=canFlipCard;
return mixOrMatch
    }
    var startGame =function () {
        setTimeout (() => {
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    var hideCards=function () {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    var flipCard = function (card) {
        if(this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');
            if(this.cardToCheck)
                this.checkForCardMatch(card);
            else
                this.cardToCheck = card;
        }
    }
    var checkForCardMatch=function (card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else 
            this.cardMisMatch(card, this.cardToCheck);
        this.cardToCheck = null;
    }
    var cardMatch=function (card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory(); 
    }
    var cardMisMatch=function (card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
    var getCardType=function (card) {
        return card.getElementsByClassName('card-value')[0].src;
    }
    var startCountDown=function () {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    var gameOver=function () {
        clearInterval(this.countDown);
        document.getElementById('game-over-text').classList.add('visible');
    }
    var victory=function () {
        clearInterval(this.countDown);
        document.getElementById('victory-text').classList.add('visible');
    }
    var shuffleCards=function () {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }
    var canFlipCard=function (card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(100, cards);
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}