//* Variables
let deckID;
let houseCard;
let playerCard;
const cardArea = document.getElementById('card-container');
const newDeck = document.getElementById('new-deck');
const drawCard = document.getElementById('draw-card');

//* API Calls
const handleNewDeckClick = () => {
	fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			deckID = data.deck_id;
		});
};

const handleDrawCardClick = () => {
	fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
	.then(response => response.json())
	.then(data => {
		houseCard = data.cards[0].value;
		playerCard = data.cards[1].value;
		console.log(data.cards);
		cardArea.children[0].innerHTML = `
			<img src=${data.cards[0].image} class="card" />
		`
		cardArea.children[1].innerHTML = `
		<img src=${data.cards[1].image} class="card" />
		`
		cardCompare(houseCard, playerCard)
	})
}

//* Compare Drawn Cards
const cardCompare = (cardOne, cardTwo) => {
	const cardValueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

	const cardOneValueIndex = cardValueOptions.indexOf(cardOne);
	const cardTwoValueIndex = cardValueOptions.indexOf(cardTwo);

	if(cardOneValueIndex > cardTwoValueIndex){
		return console.log("House card wins!")
	} else if (cardOneValueIndex < cardTwoValueIndex){
		return console.log("Player card wins!")
	} else {
		console.log("It's a tie!")
	}
}

//* Event Listeners
newDeck.addEventListener('click', handleNewDeckClick);
drawCard.addEventListener('click', handleDrawCardClick);
