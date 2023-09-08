class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }
    getRank() {
        return this.rank;
    }
    getSuit() {
        return this.suit;
    }
    toString() {
        return `${this.rank} of ${this.suit}`;
    }
} 

class Deck {
    constructor(cardsArray) {
        this.cardsArray = [];
        this.initializeDeck();
    }
    initializeDeck() {
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        for (const suit of suits) {
            for (const rank of ranks) {
                const card = new Card(rank, suit);
                this.cardsArray.push(card);
            }
        }
    }
    shuffle() {
        const numberOfCards = this.cardsArray.length;
        for (let i = numberOfCards - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            const temp = this.cardsArray[i];
            this.cardsArray[i] = this.cardsArray[randomIndex];
            this.cardsArray[randomIndex] = temp;
        }
    }
    dealCards(numOfCards) {
        const cardsToDeal = this.cardsArray.splice(0, numOfCards);
        return cardsToDeal;
    }
}

class Player {
    constructor(name, hand, score) {
        this.name = name;
        this.hand = [];
        this.score = 0;
    }
    playerName() {
        return `This player's name is ${this.name}`;
    }
    play() {
        if (this.hand.length > 0) {
            const playedCard = this.hand.pop();
            return playedCard;
        }
        return null;
    }
    receiveCards() {
        this.hand = this.hand.concat(cards);
    }
    calculateScore() {
        this.score = 0;
        for (const card of this.hand) {
            switch (card.getRank()) {
                case 'Ace':
                    this.score += 4;
                    break;
                case 'King':
                    this.score += 3;
                    break;
                case 'Queen':
                    this.score += 2;
                    break;
                case 'Jack':
                    this.score += 1;
                    break;
                default:
                    const numericValue = parseInt(card.getRank(), 10);
                    if (!isNaN(numericValue)) {
                        this.score += numericValue;
                    }
                    break;
            }
        }
    }
}

class Game {
    constructor(player1, player2, deck) {
        this.p1 = player1;
        this.p2 = player2;
        this.deck = deck;
        this.gameState = 'ongoing';
    }
    startGame() {
        this.deck.shuffle();
        const numberOfCardsToDeal= Math.floor(this.deck.cardsArray.length / 2);
        const cardsForPlayer1 = this.deck.dealCards(numberOfCardsToDeal);
        const cardsForPlayer2 = this.deck.dealCards(numberOfCardsToDeal);
        this.p1.receiveCards(cardsForPlayer1);
        this.p2.receiveCards(cardsForPlayer2);
        return 'The game has started';
    }
    determineRoundWinner() {
        const card1 = this.p1.play();
        const card2 = this.p2.play();
        if (card1 && card2) {
            const rank1 = card1.getRank();
            const rank2 = card2.getRank();
            const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
            const rank1Index = ranks.indexOf(rank1);
            const rank2Index = ranks.indexOf(rank2);
            if (rank1 === rank2) {
                return "It's a tie!";
            } else if (rank1 > rank2) {
                this.p1.score++;
                return `${this.p1.name} wins this round with a ${rank1}`;
            } else {
                this.p2.score++;
                return `${this.p2.name} wins this round with a ${rank2}`;
            }
        } else {
            return "Round cannot be determined. One or both players have no cards left.";
        }
        const winningScore = 52;
        if (this.p1.score >= winningScore || this.p2.score >= winningScore) {
            this.gameState = 'ended';
        }
    
    }
    endGame() {
    if (this.gameState === 'ended') {
        let winner = null;
        if (this.p1.score > this.p2.score) {
            winner = this.p1;
        } else if (this.p2.score > this.p1.score) {
            winner = this.p2;
        }
        if (winner) {
            return `The game is over. ${winner.name} wins with a score of ${winner.score}`;
        } else {
            return 'The game is over. It\\'s a tie!';
        }
    
    } else {
        return 'The game is still ongoing.';
    }
    
}

const player1 = new Player('Player 1');
const player2 = new Player('Player 2');
const deck = new Deck();
const game = new Game(player1, player2, deck);

console.log(game.startGame());
while (game.gameState === 'ongoing') {
    console.log(game.determineRoundWinner());
}
console.log(game.endGame());