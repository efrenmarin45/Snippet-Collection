import { boopData } from "./data.js";

const boopInput = document.getElementById("boop-input");
const boopBtn = document.getElementById("boop-btn");
const boopFeed = document.getElementById("feed");

document.addEventListener("click", (e) => {
    let dataReplies = e.target.dataset.boopReplies;
    let dataLikes = e.target.dataset.boopLikes;
    let dataReboops = e.target.dataset.boopReboops;

    if(dataReplies){
        handleReplyClick(dataReplies);
    } else if (dataLikes){
        handleLikeClick(dataLikes);
    } else if (dataReboops){
        handleReboopClick(dataReboops);
    }
});

const handleLikeClick = (boopID) => {
    console.log(boopID)
};

const handleReplyClick = (boopID) => {
    console.log(boopID)
};

const handleReboopClick = (boopID) => {
    console.log(boopID)
};

const getFeedHTML = () => {
	let feedHTML = ``;
	boopData.forEach((boops) => {
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
                                <i class="fa-solid fa-heart" data-boop-likes="${boops.uuid}"></i>
                                    ${boops.likes}
                                </span>
                                <span class="boop-detail">
                                <i class="fa-solid fa-retweet" data-boop-reboops="${boops.uuid}"></i>
                                    ${boops.reBoop}
                                </span>
                            </div>   
                        </div>            
                    </div>
                </div>`;
	});
	return feedHTML;
};

const render = () => {
	boopFeed.innerHTML = getFeedHTML();
};

render();