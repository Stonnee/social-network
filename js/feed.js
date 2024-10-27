

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
  })
  .catch(error => {
    console.error('Error fetching posts:', error);
  });

// Créer un élément de publication
function createPostElement(post) {
  console.log('Creating post element:', post);
  const postElement = document.createElement('div');
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
  ['Like', 'Dislike', 'Love'].forEach(reaction => {
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



