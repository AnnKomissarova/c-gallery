import { errorMessage, showMessage, token, LOCATOR_POST, closeModal} from "./create-post.js";
import { LOCATOR_GET, postId, previewModal } from "./display-post.js";

const deletePostBtn = document.querySelector(`#delete-post`);
const likeBtn = document.querySelector(`.fa-heart`);
const overlayContent = document.querySelector(`.overlay__content`);
const statisticsLikes = document.querySelector(`.statistics__likes`);
let likesNum = 0;
const commentsBtn = document.querySelector(`.comments-button`);
const postComment = document.querySelector(`#post-comment`);
const statisticsComments = document.querySelector(`.statistics__comments`);
const LOCATOR_COMM = `https://c-gallery.polinashneider.space/api/v1/comments/`;
let commentsNum = 0;

function deletePost() {
    deletePostBtn.addEventListener('click', () => {
        const response = fetch(`${LOCATOR_GET}${postId}`, {
            method: "DELETE",
            headers: {
                'Authorization': token,
            }
        })
        .then((res)=> {
            if(res.ok) {
                showMessage();
            }
        })
        .catch(() => {
            errorMessage();
        })
        .finally(() => {
            closeModal();
            previewModal.classList.remove(`active`);
        })
        return response
    })    
}

 async function likePost() {
    try {
        const response = await fetch (`${LOCATOR_POST}${postId}/like/`, {
            method: 'POST',
            headers: {
                Authorization: token
            },
            body: `${postId}`,
        });
        
        if(response.ok) {
            likesNum++;
            statisticsLikes.classList.add(`liked`);
            displayLikes();
        } else {
            errorMessage();
        }
    } catch (err) {
        errorMessage();
    } 
}

 function displayLikes() {
    statisticsLikes.querySelector(`span`).textContent = likesNum;
    overlayContent.querySelector(`.likes span`).textContent = likesNum; 
}

likeBtn.addEventListener('click', likePost);

async function sendComment() {
    const form = JSON.stringify({
        "text" : postComment.value,
        "post" : postId
    });

    if(!postComment.value) {
        return;
    }

    try {
        const response = await fetch(LOCATOR_COMM, {
            method: "POST",
            headers: {
                Authorization: token
            },
            body: form,           
        });

        if(response.status === 201) {
            commentsNum++;
            displayComments();
        } else {
            errorMessage();
        }
    } catch (err) {
        errorMessage();
    } finally {
        postComment.value = "";
    }
};

function displayComments() {
    statisticsComments.querySelector('span').textContent = commentsNum;
    overlayContent.querySelector(`.comments span`).textContent = commentsNum;
}

 document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      sendComment();
      closeModal();
      previewModal.classList.remove(`active`);
    }
});

commentsBtn.addEventListener('click', sendComment);


export{deletePost};
