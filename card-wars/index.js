//* Variables
let deckID;
const cardArea = document.getElementById('card-container');

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
		console.log(data.cards);
		cardArea.innerHTML = `
			<img src=${data.cards[0].image} />
			<img src=${data.cards[1].image} />
		`
	})
}

//* Event Listeners
document.getElementById('new-deck').addEventListener('click', handleNewDeckClick);
document.getElementById('draw-card').addEventListener('click', handleDrawCardClick);
