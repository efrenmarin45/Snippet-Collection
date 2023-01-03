//* Variables
let deckID;
let houseCard;
let playerCard;
let gameMessage;
const cardArea = document.getElementById("card-container");
const newDeck = document.getElementById("new-deck");
const drawCard = document.getElementById("draw-card");
const messageArea = document.getElementById("game-message");
const cardsLeft = document.getElementById("cards-remaining");

//* API Calls
const handleNewDeckClick = () => {
	fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			deckID = data.deck_id;
			disableDrawCardBtn(data);
		});

	newDeck.textContent = "Reset Your Deck";
	newDeck.classList.remove("breathe");
	drawCard.classList.add("breathe");
};

const handleDrawCardClick = () => {
	fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
		.then((response) => response.json())
		.then((data) => {
			houseCard = data.cards[0].value;
			playerCard = data.cards[1].value;
			console.log(data.cards);
			cardArea.children[0].innerHTML = `
			<img src=${data.cards[0].image} class="card" />
		`;
			cardArea.children[1].innerHTML = `
		<img src=${data.cards[1].image} class="card" />
		`;
			cardCompare(houseCard, playerCard);

			messageArea.textContent = gameMessage;
			cardsLeft.textContent = `Cards Left: ${data.remaining}`;

			disableDrawCardBtn(data);
		});
};

//* Compare Drawn Cards
const cardCompare = (cardOne, cardTwo) => {
	const cardValueOptions = [
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"JACK",
		"QUEEN",
		"KING",
		"ACE",
	];

	const cardOneValueIndex = cardValueOptions.indexOf(cardOne);
	const cardTwoValueIndex = cardValueOptions.indexOf(cardTwo);

	if (cardOneValueIndex > cardTwoValueIndex) {
		return (gameMessage = "House card wins!");
	} else if (cardOneValueIndex < cardTwoValueIndex) {
		return (gameMessage = "Player card wins!");
	} else {
		gameMessage = "It's a tie!";
	}
};

//* Disables Draw Card Button
const disableDrawCardBtn = (cards) => {
	if (cards.remaining === 0) {
		drawCard.disabled = true;
		drawCard.classList.add("disabled");
		drawCard.classList.remove("breathe");
		newDeck.classList.add('breathe');
	} else if (cards.remaining === 52){
		drawCard.disabled = false;
		drawCard.classList.remove("disabled");
		drawCard.classList.add("breathe");
		newDeck.classList.remove('breathe');
	}
};

//* Event Listeners
newDeck.addEventListener("click", handleNewDeckClick);
drawCard.addEventListener("click", handleDrawCardClick);
