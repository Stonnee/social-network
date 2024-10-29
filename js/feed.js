

// Récupérer les publications depuis posts.json
fetch('data/posts.json')
  .then(response => response.json())
  .then(posts => {
    
    const feedContainer = document.getElementById('post-list');
    posts.forEach(post => {
      const postElement = createPostElement(post);
      console.log('Post element:', postElement);
      feedContainer.appendChild(postElement);
    });

    const reactionButtons = document.querySelectorAll('.reactions button');
    reactionButtons.forEach(button => {
      button.addEventListener('click', handleReactionClick);
    });
  })
  .catch(error => {
    console.error('Error fetching posts:', error);
  });



// Fonction pour gérer les clics sur les boutons de réaction
function handleReactionClick(event) {
  const button = event.target;
  const reactionCountElement = button.previousElementSibling;
  const postElement = button.closest('.post');
  const postIndex = postElement.dataset.index;
  
  console.log('Reaction button clicked:', event);
  console.log('Reaction count element:', postIndex);
  console.log('Parent post element:', postElement);

  fetch('data/posts.json')
    .then(response => response.json())
    .then(posts => {
      const post = posts.find(p => p.id == postIndex);
      if (post) {
        switch (button.textContent) {
          case 'likes':
            post.likes += 1;
            break;
          case 'dislikes':
            post.dislikes += 1;
            break;
          case 'love':
            post.love += 1;
            break;
        }
        return fetch('data/posts.json', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(posts)
        });
      }
    })
    .catch(error => {
      console.error('Error updating post:', error);
    });

  /* switch (button.textContent) {
    case 'likes':
      reactionCountElement.textContent = parseInt(reactionCountElement.textContent, 10) + 1;
      break;
    case 'dislikes':
      reactionCountElement.textContent = parseInt(reactionCountElement.textContent, 10) + 1;
      break;
    case 'love':
      reactionCountElement.textContent = parseInt(reactionCountElement.textContent, 10) + 1;
      break;
    default:
      console.warn('Unknown reaction:', button.textContent);
  } */
}


// Créer un élément de publication
function createPostElement(post) {
  const postElement = document.createElement('div');
  postElement.dataset.index = post.id;
  postElement.classList.add('post');


  //  photo de publication
  if (post.photo) {
    const photoElement = document.createElement('img');
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
    const reactionNumber = document.createElement('p');
    reactionNumber.textContent = post[reaction];
    const reactionButton = document.createElement('button');
    reactionButton.textContent = reaction;
    reactionsElement.appendChild(reactionButton);
  });
  postElement.appendChild(reactionsElement);

  // Ajouter une section de commentaires
  const commentsElement = document.createElement('div');
  commentsElement.classList.add('comments');
  postElement.appendChild(commentsElement);

  // input commentaire
  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.placeholder = 'Add a comment...';
  commentsElement.appendChild(commentInput);

  // bouton de commentaire
  const commentButton = document.createElement('button');
  commentButton.textContent = 'Comment';
  commentsElement.appendChild(commentButton);
  console.log('Post element created:', post.comments);

  const commentSection = document.createElement('ul');
  post.comments.forEach(comment => {
    const commentElement = document.createElement('li');
    commentElement.textContent = comment;
    commentSection.appendChild(commentElement);
  });
  postElement.appendChild(commentSection);

  return postElement;
}



