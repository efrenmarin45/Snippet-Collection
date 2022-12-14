//* Data Source
import { boopData } from "./data.js";

//* Variables - DOM elements
const boopInput = document.getElementById("boop-input");
const boopBtn = document.getElementById("boop-btn");
const boopFeed = document.getElementById("feed");

//* Document Event Listener
document.addEventListener("click", (e) => {
	let dataReplies = e.target.dataset.boopReplies;
	let dataLikes = e.target.dataset.boopLikes;
	let dataReboops = e.target.dataset.boopReboops;

	if (dataReplies) {
		handleReplyClick(dataReplies);
	} else if (dataLikes) {
		handleLikeClick(dataLikes);
	} else if (dataReboops) {
		handleReboopClick(dataReboops);
	}
});

//* Checking to see if the data attribute matches the UUID of any object within the data source. Since there is only one UUID per user, we default to zero index and icrement by 1.
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

const handleReplyClick = (boopID) => {
    document.getElementById(`replies-${boopID}`).classList.toggle('hidden');
};

const getFeedHTML = () => {
	let feedHTML = ``;
	boopData.forEach((boops) => {
		let likeIcon = "";
		let shareIcon = "";

		if (boops.isLiked) {
			likeIcon = "liked";
		}
		if (boops.isBooped) {
			shareIcon = "reBoop";
		}

		let repliesHTML = '';

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

const render = () => {
	boopFeed.innerHTML = getFeedHTML();
};

render();
