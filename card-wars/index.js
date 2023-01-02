let deckID;

const handleNewDeckClick = () => {
	fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			deckID = data.deck_id;
		});
};

document.getElementById('new-deck').addEventListener('click', handleNewDeckClick);