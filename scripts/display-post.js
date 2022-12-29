const emptyContent = document.querySelector(`.empty-content`);
const photosContent = document.querySelector(`.photos__content`);
const postTemplate = document.querySelector(`#post-template`);
const postCount = document.querySelector(`#photo-count`);
const previewModal = document.querySelector(`.preview-post-modal`);
const modalContent = document.querySelector(`.modal__content`);
const modalContentImage = document.querySelector(`#post-photo`);
const modalContentText = document.querySelector(`.post-text`);
const modalContentTags = document.querySelector(`.post-hashtags`);
let count = 0;

if (count === 0) {
    emptyContent.classList.remove(`hidden`);
    photosContent.classList.add(`hidden`);
} else {
    emptyContent.classList.add(`hidden`);
    photosContent.classList.remove(`hidden`);
};

photosContent.addEventListener('click', () =>{
    previewModal.classList.add(`active`);
});

function addingPost(image, comments, likes) {
    const photo = postTemplate.textContent.cloneNode(true);
    photo.querySelector(`img`).src = image;
    photo.querySelector(`.comments span`).textContent = comments;
    photo.querySelector(`.likes span`).textContent = likes;
    return photo;
};

fetch(locator, {                
        headers: {
            'Authorization': token, 
        },
    })
    .then((response) => {
        return response.json();
    })
    .then((result) => {  
        addingPost(image,comments,likes);     
        count = result.length;
        postCount.textContent = `${count}`;

        result.forEach(result => {
            const photoPost = addingPost(result.image, result.comments, result.likes);            
            photosContent.append(addingPost);
        });       
    });
   

import { token, image, locator } from "./create-post.js";
export {addingPost};