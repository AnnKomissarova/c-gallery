const modal = document.querySelector(".add-post-modal");
const addPhotoBtn = document.querySelector("#add-photo");
const addPostBtn = document.querySelector("#add-first-post");
const bodyOverlay = document.querySelector(".body-overlay");
const body = document.querySelector("body");

function openModal(){
    modal.classList.add('active');        
    bodyOverlay.classList.add('active');
    body.classList.add('.with-overlay');
};

function closeModal(){
  modal.classList.remove('active'); 
  bodyOverlay.classList.remove('active');
  body.classList.remove('.with-overlay');
  step1.classList.remove('hidden');
  step2.classList.add('hidden');
  modalFooter.classList.add('hidden');
  dataCleaning();
};

document.addEventListener('click', (e) => {
    const click = e.composedPath().includes(modal) || e.composedPath().includes(addPhotoBtn) || e.composedPath().includes(addPostBtn);
    if ( !click ) {
      closeModal();
    }
  });

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
  });

addPhotoBtn.addEventListener('click', openModal);
addPostBtn.addEventListener('click', openModal);
