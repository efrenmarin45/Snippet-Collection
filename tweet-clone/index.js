//* Data Source
import { boopData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

//* Variables - DOM elements
const boopInput = document.getElementById("boop-input");
const boopFeed = document.getElementById("feed");

//* Document Event Listener
document.addEventListener("click", (e) => {
	let dataReplies = e.target.dataset.boopReplies;
	let dataLikes = e.target.dataset.boopLikes;
	let dataReboops = e.target.dataset.boopReboops;
	let dataDelete = e.target.dataset.boopDelete;

	if (dataReplies) {
		handleReplyClick(dataReplies);
	} else if (dataLikes) {
		handleLikeClick(dataLikes);
	} else if (dataReboops) {
		handleReboopClick(dataReboops);
	} else if (e.target.id === "boop-btn") {
		handleInputBtnClick();
	} else if (dataDelete) {
		handleDeleteClick(dataDelete);
	}
});

//* Checking to see if the data attribute matches the UUID of any object within the data source. Since there is only one UUID per user, we default to zero index and increment by 1.
const handleLikeClick = (boopID) => {
	const targetBoopObj = boopData.filter((props) => {
		return props.uuid === boopID;
	})[0];

	// Checks to see if post has been liked already
	if (targetBoopObj.isLiked) {
		targetBoopObj.likes--;
	} else {
		targetBoopObj.likes++;
	}

	// Toggles isLiked between true and false
	targetBoopObj.isLiked = !targetBoopObj.isLiked;

	// Renders changes to the view
	render();
};

const handleReboopClick = (boopID) => {
	const targetBoopObj = boopData.filter((props) => {
		return props.uuid === boopID;
	})[0];

	if (targetBoopObj.isBooped) {
		targetBoopObj.reBoop--;
	} else {
		targetBoopObj.reBoop++;
	}

	targetBoopObj.isBooped = !targetBoopObj.isBooped;

	render();
};

//* Toggles the reply section on and off
const handleReplyClick = (boopID) => {
	document.getElementById(`replies-${boopID}`).classList.toggle("hidden");
};

//* Takes user boop and places it in the boopData array
const handleInputBtnClick = () => {
	if (boopInput.value){
		boopData.unshift({
			handle: "@PlayerOne",
			profilePic: "img/default_avatar.jpg",
			likes: 0,
			reBoop: 0,
			boopText: boopInput.value,
			replies: [
			],
			isLiked: false,
			isBooped: false,
			uuid: uuidv4()
		},);
		render();
		boopInput.value = '';
	} 
};

//* Removes only user generated boops
const handleDeleteClick = (boopID) => {
	const targetBoopObj = boopData.filter((props) => {
		return props.uuid === boopID;
	})[0];
	
	if(targetBoopObj.handle === "@PlayerOne"){
		console.log("boopData", boopData);
		console.log("target", targetBoopObj.uuid);
	}

	render();
};

//* Displays the feed of boops
const getFeedHTML = () => {
	let feedHTML = ``;
	boopData.forEach((boops) => {
		let likeIcon = "";
		let shareIcon = "";
		let deleteIcon = "";

		if (boops.isLiked) {
			likeIcon = "liked";
		}
		if (boops.isBooped) {
			shareIcon = "reBoop";
		}
		if (boops.handle === "@PlayerOne"){
			deleteIcon = "deleteBoop"
		}

		let repliesHTML = "";

		if (boops.replies.length > 0) {
			boops.replies.forEach((replies) => {
				repliesHTML += `
            <div class="boop-reply">
                <div class="boop-inner">
                    <img src="${replies.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${replies.handle}</p>
                        <p class="boop-text">${replies.boopText}</p>
                    </div>
                </div>
            </div>`;
			});
		}

		feedHTML += `<div class="boop">
                    <div class="boop-inner">
                        <img src="${boops.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${boops.handle}</p>
                            <p class="boop-text">${boops.boopText}</p>
                            <div class="boop-details">
                                <span class="boop-detail">
									<i class="fa-regular fa-comment-dots" data-boop-replies="${boops.uuid}"></i> 
										${boops.replies.length}
                                </span>
                                <span class="boop-detail">
									<i class="fa-solid fa-heart ${likeIcon}" data-boop-likes="${boops.uuid}"></i>
										${boops.likes}
                                </span>
                                <span class="boop-detail">
									<i class="fa-solid fa-retweet ${shareIcon}" data-boop-reboops="${boops.uuid}"></i>
										${boops.reBoop}
                                </span>
								<span class="boop-detail">
									<i class="fa-solid fa-trash ${deleteIcon}" data-boop-delete="${boops.uuid}"></i>
                                </span>
                            </div>   
                        </div>            
                    </div>
                <div class="hidden" id="replies-${boops.uuid}">
                    ${repliesHTML}
                </div>
            </div>`;
	});
	return feedHTML;
};

//* Renders the UI into the DOM
const render = () => {
	boopFeed.innerHTML = getFeedHTML();
};

render();