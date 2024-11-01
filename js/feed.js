var POSTS;
var CONVERSATIONS;

// Récupérer les publications depuis posts.json
function init(){
  fetch('data/posts.json')
    .then(response => response.json())
    .then(posts => {
      POSTS = posts;
      const feedContainer = document.getElementById('post-list');
      POSTS.forEach(post => {
        const postElement = createPostElement(post);
        console.log('Post element:', postElement);
        feedContainer.appendChild(postElement);
      });
      // Ajoute les listeners pour les boutons de réaction
      const reactionButtons = document.querySelectorAll('.reactions button');
      reactionButtons.forEach(button => {
        button.addEventListener('click', handleReactionClick);
      });
      // Ajoute les listeners pour les boutons de commentaire
      const commentButtons = document.querySelectorAll('.comments button');
      commentButtons.forEach(button => {
        button.addEventListener('click', handleCommentClick);
      });
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
}

// Fonction pour gérer les clics sur les boutons de réaction
function handleReactionClick(event) {
  var button = event.target;
  var button = button.dataset.reaction == undefined ? button.closest('button') : button;

  
  const reactionCountElement = button.querySelector('span');

  const postElement = button.closest('.post');
  const postIndex = postElement.dataset.index;
  const postType = button.dataset.reaction;
  
  console.log('Reaction button clicked:', event);
  console.log('Reaction count element:', postIndex);
  console.log('Parent post element:', postElement);
  console.log('Reaction count element:', button);
  const post = POSTS.find(p => p.id == postIndex);
  console.log('Post:', post);
  if (post) {
    switch (postType) {
      case 'likes':
        post.likes += 1;
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa', button.textContent);
        reactionCountElement.textContent = post.likes;
        break;
      case 'dislikes':
        post.dislikes += 1;
        reactionCountElement.textContent = post.dislikes;
        break;
      case 'love':
        post.love += 1;
        reactionCountElement.textContent = post.love;
        break;
    }
    // annimation de réaction
    button.classList.add('clicked');
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 300);
  }
}

// Fonction pour gérer les clics sur les boutons de commentaire et ajouter le nouveau commentaire à la liste des commentaires
function handleCommentClick(event) {
  const button = event.target;
  const commentInput = button.previousElementSibling;
  const commentText = commentInput.value.trim();
  const postElement = button.closest('.post');
  const commentsList = postElement.querySelector('.comments ul');

  if (commentText !== '') {
    const newComment = document.createElement('li');
    newComment.textContent = commentText;
    
    commentsList.appendChild(newComment);

    commentInput.value = '';
  }
}

// Créer un élément de publication
function createPostElement(post) {
  const postElement = document.createElement('div');
  postElement.dataset.index = post.id;
  postElement.classList.add('post');

  //  photo de publication
  if (post.photo) {
    const photoElement = document.createElement('img');
    photoElement.classList.add('post-photo');
    photoElement.src = post.photo;
    photoElement.alt = 'Post photo';
    postElement.appendChild(photoElement);

    // Ajouter la fonctionnalité de photo en plein écran
    photoElement.addEventListener('click', () => {
      showFullscreenPhoto(post.photo);
    });
  }

  // texte de la publication
  const textElement = document.createElement('p');
  textElement.textContent = post.message;
  postElement.appendChild(textElement);

  // boutons de réaction
  const reactionsElement = document.createElement('div');
  reactionsElement.classList.add('reactions');
  ['likes', 'dislikes', 'love'].forEach(reaction => {
    const reactionButton = document.createElement('button');
    const spanNumber = document.createElement('span');
    spanNumber.textContent = post[reaction];
    reactionButton.dataset.reaction = reaction;
    const reactionImage = document.createElement('img');
    reactionImage.src = `assets/${reaction}.png`; // Assurez-vous que les images sont dans le dossier assets
    reactionImage.alt = reaction;
    reactionButton.appendChild(spanNumber);
    reactionButton.appendChild(reactionImage);
    reactionsElement.appendChild(reactionButton);
  });
  postElement.appendChild(reactionsElement);

  // Ajouter une section de commentaires
  const commentsElement = document.createElement('div');
  commentsElement.classList.add('comments');
  postElement.appendChild(commentsElement);

  // input commentaire
  const commentsList = document.createElement('ul');
  post.comments.forEach(comment => {
    const commentElement = document.createElement('li');
    commentElement.textContent = comment;
    commentsList.appendChild(commentElement);
  });
  commentsElement.appendChild(commentsList);

  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.placeholder = 'Add a comment...';
  commentsElement.appendChild(commentInput);

  // bouton de commentaire
  const commentButton = document.createElement('button');
  commentButton.textContent = 'Comment';
  commentsElement.appendChild(commentButton);
  
  return postElement;
}

init();