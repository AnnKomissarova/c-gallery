import { previewModal } from "./display-post.js";
import { commentContent } from "./delete-post.js";
const modal = document.querySelector(".add-post-modal");
const addPhotoBtn = document.querySelector("#add-photo");
const addPostBtn = document.querySelector("#add-first-post");
const bodyOverlay = document.querySelector(".body-overlay");
const body = document.querySelector("body");
const LOCATOR_POST = `https://c-gallery.polinashneider.space/api/v1/posts/`;
const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1OTUzMDQ0LCJpYXQiOjE2NzExMTQ2NDQsImp0aSI6IjVjYThjMzJjNjUwYTRmZDI4OWQyMjFkMGNjZDA5NDEyIiwidXNlcl9pZCI6Mjh9.OTx5qCTfJZP-Y-gTO222zbMA_BejrdIjPP9XH48nozM`

function openModal(){
   modal.classList.add('active');        
   bodyOverlay.classList.add('active');
   body.classList.add('with-overlay');
};

function closeModal(){
 modal.classList.remove('active'); 
 bodyOverlay.classList.remove('active');
 body.classList.remove('with-overlay');
 step1.classList.remove('hidden');
 step2.classList.add('hidden');
 modalFooter.classList.add('hidden');
 previewModal.classList.remove('active');
 commentContent.textContent = "";
 dataCleaning();
};

bodyOverlay.addEventListener('click', () => {
  closeModal();
  previewModal.classList.remove(`active`);
});

document.addEventListener('keydown', function(e) {
 if (e.key === 'Escape') {
   closeModal();
   previewModal.classList.remove(`active`);
 }
 });

addPhotoBtn.addEventListener('click', openModal);
addPostBtn.addEventListener('click', openModal);


const fileUpload = document.querySelector('#file-upload');
let image = document.querySelector('#uploaded-photo');
const step1 =  document.querySelector('.add-post-modal__step-1');
const step2 =  document.querySelector('.add-post-modal__step-2');
const modalFooter = document.querySelector('.modal__footer');

fileUpload.addEventListener('change', () => {
    image.src = URL.createObjectURL(fileUpload.files[0]);
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    modalFooter.classList.remove('hidden');     
});

const postText = document.querySelector("#post-text");
const postHashtags = document.querySelector("#post-hashtags");

function dataCleaning (){    
  postText.value = "";
  postHashtags.value = "";
  image.src = "./img/photo-post.jpg";
};

const publishBtn = document.querySelector("#post-publish");


publishBtn.addEventListener('click', () => {
    const formData = new FormData();
    formData.append("image", fileUpload.files[0]);
    formData.append("text", postText.value);
    formData.append("tags", postHashtags.value);

   const reply = fetch(LOCATOR_POST, {
        method: 'POST',
        body: formData,                 
        headers: {
            'Authorization': 
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc1OTUzMDQ0LCJpYXQiOjE2NzExMTQ2NDQsImp0aSI6IjVjYThjMzJjNjUwYTRmZDI4OWQyMjFkMGNjZDA5NDEyIiwidXNlcl9pZCI6Mjh9.OTx5qCTfJZP-Y-gTO222zbMA_BejrdIjPP9XH48nozM",
        },
    })
    .then((rep) => {
        if (rep.ok) {
            showMessage();
        }
    })
    .catch((error) => {
        errorMessage();
    })
    closeModal();
    return reply    
});

function showMessage() {
    const successMessage = document.querySelector("#alert-success");
    const clon = successMessage.content.firstElementChild.cloneNode(true);
    document.body.appendChild(clon);
  
    setTimeout(() => {
      clon.remove();
    }, 2000);
  };

function errorMessage () {
    const errorMessage = document.querySelector('#alert-fail');
    const clon = errorMessage.content.firstElementChild.cloneNode(true);
    document.body.appendChild(clon);

    setTimeout(() => {
        clon.remove();
      }, 2000);
};


export {modal, addPhotoBtn, addPostBtn, body, bodyOverlay, openModal, closeModal, dataCleaning, showMessage, errorMessage};
export {image, token, LOCATOR_POST};

