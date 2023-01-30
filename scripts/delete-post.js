import { errorMessage, showMessage, token, LOCATOR_POST, closeModal} from "./create-post.js";
import { LOCATOR_GET, postId, previewModal, likesCount, renderComments} from "./display-post.js";

const deletePostBtn = document.querySelector(`#delete-post`);
const likeBtn = document.querySelector(`.fa-heart`);
const statisticsLikes = document.querySelector(`.statistics__likes`);
const commentsBtn = document.querySelector(`.comments-button`);
const postComment = document.querySelector(`#post-comment`);
const statisticsComments = document.querySelector(`.statistics__comments`);
const commentsTemplate = document.querySelector(`#comments-template`);
const commentContent = document.querySelector(`.comments__content`);
const LOCATOR_COMM = `https://c-gallery.polinashneider.space/api/v1/comments/`;

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
            body: `${likesCount}`,
        });
        
        if(response.ok) {
            statisticsLikes.querySelector(`span`).textContent = ++statisticsLikes.querySelector(`span`).textContent;            
            statisticsLikes.classList.add(`liked`);
        } else {
            errorMessage();
        }
    } catch (err) {
        errorMessage();
    } 
}

likeBtn.addEventListener('click', likePost);

async function sendComment() {
    const form = {
        "text" : postComment.value,
        "post" : postId
    };

    if(!postComment.value) {
        return;
    }
    try {
        const response = await fetch(LOCATOR_COMM, {
            method: "POST",
            headers: {
                Authorization: token,
                'Content-Type': "application/json"
            },
            body: JSON.stringify(form)           
        });

        if(response.status === 201) {          
            const postComments = makeComment(form);
            commentContent.append(postComments);                     
        } else {
            errorMessage();
        }
    } catch (err) {
        errorMessage();
    } finally {
        postComment.value = "";        
    }
};

const userComment = {

} 

function makeComment(userComment) {
    const {text, created_at} = userComment;
    const comment = commentsTemplate.content.cloneNode(true);
    comment.querySelector(`.comments__item-comment`).textContent = text;
    comment.querySelector(`.comments__item-avatar`).src = "./assets/avatar-comment.svg";
    comment.querySelector(`.comments__item-nickname`).textContent = "User";
    comment.querySelector(`.comments__item-time`).textContent = moment.utc(created_at).format('LLL');    
    return comment;
};

 document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      sendComment();
      closeModal();
      previewModal.classList.remove(`active`);
    }
});

commentsBtn.addEventListener('click', sendComment);


export{deletePost, statisticsLikes, statisticsComments, commentContent, makeComment};
