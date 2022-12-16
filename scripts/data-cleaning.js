const postText = document.querySelector("#post-text");
const postHashtags = document.querySelector("#post-hashtags");

function dataCleaning (){    
  postText.value = "";
  postHashtags.value = "";
  image.src = "./img/photo-post.jpg";
}