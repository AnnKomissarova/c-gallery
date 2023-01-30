import { token, body, bodyOverlay } from "./create-post.js";
import { statisticsLikes, commentContent, makeComment, statisticsComments } from "./delete-post.js";
const postTime = document.querySelector(`.account-info__time`);
const modalContentImage = document.querySelector(`#post-photo`);
const modalContentText = document.querySelector(`.post-text`);
const modalContentTags = document.querySelector(`.post-hashtags`);
const emptyContent = document.querySelector(`.empty-content`);
const photosContent = document.querySelector(`.photos__content`);
const postTemplate = document.querySelector(`#post-template`);
const postCount = document.querySelector(`#photo-count`);
const previewModal = document.querySelector(`.preview-post-modal`);
const LOCATOR_GET = `https://c-gallery.polinashneider.space/api/v1/users/me/posts/`;
let count = null;
let postId = null;
let likesCount = null;
let commentsCount = null;
let commentsArr = {};

function renderComments(arr) {
    arr.forEach((item) => {
        commentContent.append(makeComment(item));
    });
};


function displayPosts() {
    fetch(LOCATOR_GET, {
        headers: {
            'Authorization': token,
        },
    })

        .then((response) => {
            return response.json();
        })

        .then((result) => {
            function addingPost(image, comments, likes) {
                const photo = postTemplate.content.firstElementChild.cloneNode(true);
                photo.querySelector(`img`).src = image;
                photo.querySelector(`.comments span`).textContent = comments.length;
                photo.querySelector(`.likes span`).textContent = likes;
                return photo;
            };

            function openPost(image, text, tags, created_at) {
                modalContentImage.src = image;
                modalContentText.textContent = text;
                modalContentTags.textContent = tags;
                postTime.textContent = created_at;
                statisticsLikes.querySelector(`span`).textContent = likesCount;
                statisticsComments.querySelector(`span`).textContent = commentsArr.length;
                renderComments(commentsArr);
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
                photosContent.prepend(photoPost);

                photoPost.addEventListener("click", () => {
                    openPost(
                        result.image,
                        result.text,
                        result.tags,
                        moment.utc(result.created_at).format('LLL'),
                        result.id,
                        postId = result.id,
                        result.likes,
                        likesCount = result.likes,
                        result.comments,
                        commentsArr = result.comments
                    );
                });
            });
            photosContent.addEventListener('click', function () {
                previewModal.classList.add('active');
                bodyOverlay.classList.add('active');
                body.classList.add('with-overlay');
            });
        });
};

export { displayPosts, previewModal, LOCATOR_GET, postId, likesCount, commentsCount, renderComments, photosContent };