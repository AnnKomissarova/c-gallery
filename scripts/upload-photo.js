const fileUpload = document.querySelector('#file-upload');
let image = document.querySelector('#uploaded-photo');
const step1 =  document.querySelector('.add-post-modal__step-1');
const step2 =  document.querySelector('.add-post-modal__step-2');
const modalFooter = document.querySelector('.modal__footer');

fileUpload.addEventListener('change', () => {
    image.src = URL.createObjectURL(fileUpload.files[0]);     
});

fileUpload.addEventListener('click', () => {
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    modalFooter.classList.remove('hidden');
});

