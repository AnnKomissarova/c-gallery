import { token, image, body, bodyOverlay } from "./create-post.js";

const emptyContent = document.querySelector(`.empty-content`);
const photosContent = document.querySelector(`.photos__content`);
const postTemplate = document.querySelector(`#post-template`);
const postCount = document.querySelector(`#photo-count`);
const previewModal = document.querySelector(`.preview-post-modal`);
const locatorGet = `https://c-gallery.polinashneider.space/api/v1/users/me/posts/`;
let count = 0;  

function displayPosts() { 
    fetch(locatorGet, {                
        headers: {
            'Authorization': token, 
        },
    })

    .then((response) => {
        return response.json();
    })

    .then((result) => {  
        const postTime = document.querySelector(`.account-info__time`);
        const modalContentImage = document.querySelector(`#post-photo`);
        const modalContentText = document.querySelector(`.post-text`);
        const modalContentTags = document.querySelector(`.post-hashtags`); 

        function addingPost(image, comments, likes) {
            const photo = postTemplate.content.firstElementChild.cloneNode(true);
            photo.querySelector(`img`).src = image;
            photo.querySelector(`.comments span`).textContent = comments;
            photo.querySelector(`.likes span`).textContent = likes;
            return photo;            
        };        

        count = result.length;
        postCount.textContent = `${count}`;

        if (count === 0) {
            emptyContent.classList.remove(`hidden`);
            photosContent.classList.add(`hidden`);
        } else {
            emptyContent.classList.add(`hidden`);
            photosContent.classList.remove(`hidden`);
        };

        result.forEach(result => {
            const photoPost = addingPost(result.image, result.comments, result.likes);            
            photosContent.append(addingPost);

            function openPreviewModal(image, text, tags, time){
                modalContentImage.src = image;
                modalContentText.textContent = text;
                modalContentTags.textContent = tags;
                postTime.textContent = time;
            }

            photosContent.addEventListener('click', function() {
                previewModal.classList.add(`active`);
                body.classList.add(`with-overlay`);
                bodyOverlay.classList.add(`active`);
            })
        });       
    });   
};

export {displayPosts};