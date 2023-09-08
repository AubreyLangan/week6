const {expect} = require('chai');
const {Player, Deck, Game} = require('./week6.js');

describe('Player', () => {
    it('#Should initialize with a name', () => {
        const player = new Player('Aubrey');
        expect(player.name).to.equal('Aubrey');
    });
    it('#Should start with an empty hand', () => {
    const player = new Player('Makiah');
    expect(player.hand).to.be.an('array').that.is.empty;
    });
});

describe('Player', () => {
    it('#Should return the expected card when playing', () => {
        const player = new Player('Aubrey');
        const expectedCard = {rank: 'Ace', suit: 'Spades'};
        player.hand.push(expectedCard);
        const playedCard = player.play();
        expect(playedCard).to.deep.equal(expectedCard);
    });
    it('#Should return null when the hand is empty' () => {
        const player = new Player('Makiah');
        const playedCard = player.play();
        expect(playedCard).to.be.null;
    });
});

describe('Player', () => {
    it('#Should add cards to the player\'s hand', () => {
        const player = new Player('Aubrey');
        const card1 = {rank: 'Ace', suit: 'Spades'};
        const card2 = {rank: 'King', suit: 'Hearts'};
        player.receiveCards([card1, card2]);
        expect(player.hand).to.deep.equal([card1, card2]);
    });
});

describe('Player', () => {
    it('#Should calculate the player\'s score', () => {
        const player = new Player('Makiah');
        const cards = [
            new Card('Ace', 'Spades'),
            new Card('King', 'Hearts'),
            new Card('Queen', 'Diamonds'),
        ];
        player.receiveCards(cards);
        player.calculateScore();
        expect(player.score).to.equal(9)
    });
});

describe('Deck', () => {
    it('#Should create the correct number of cards', () => {
        const deck = new Deck();
        const expectedCardCount = 52;
        expect(deck.cardsArray.length).to.equal(expectedCardCount);
    });
});

describe('Deck', () => {
    it('#Should shuffle the cards randomly', () => {
        const deck1 = new Deck();
        const deck2 = new Deck();
        deck1.shuffle();
        let cardsMatch = true;
        for (let i = 0; i < deck1.cardsArray.length; i++) {
            if (deck1.cardsArray[i] !== deck2.cardsArray[i]) {
                cardsMatch = false;
                break;
            }
        }
        expect(cardsMatch).to.be.false;

    });
});

describe('Deck', () => {
    it('#Should deal the correct number of cards', () => {
        const deck = new Deck();
        const numberOfCardsToDeal = 5
        const dealtCards = deck.dealCards(numberOfCardsToDeal);
        expect(dealtCards).to.have.lengthOf(numberOfCardsToDeal);
    });
});

describe('Game', () => {
    it('#Should initialize the game state correctly', () => {
        const player1 = new Player('Player 1');
        const player2 = new Player('Player 2');
        const deck = new Deck();
        const game = new Game(player1, player2, deck);
        expect(game.gameState).to.equal('ongoing');
    });
});

describe('Game', () => {
    it('#Should correctly identify the winner of each round', () => {
        const player1 = new Player('Player 1');
        const player2 = new Player('Player 2');
        const deck = new Deck();
        const game = new Game(player1, player2, deck);
        player1.hand.push(new Card('Queen', 'Diamonds'));
        player2.hand.push(new Card('Jack', 'Spades'));
        game.determinedRoundWinner();
        const roundWinner = game.getRoundWinner();
        expect(game.getRoundWinner()).to.equal('Player 1');
    });
});

describe('Game', () => {
    it('#Should correctly identify the game state as "ended"', () => {
        const player1 = new Player('Player 1');
        const player2 = new Player('Player 2');
        const deck = new Deck();
        const game = new Game(player1, player2, deck);
        player1.score = 52;
        player2.score = 30;
        const gameState = game.endGame();
        expect(gameState).to.equal('The game is over. Player 1 wins with a score of 52');
    });
});