document.addEventListener('DOMContentLoaded', () => {
  const conversationList = document.getElementById('conversation-list');
  const messageHistory = document.getElementById('message-history');
  const newMessageForm = document.getElementById('new-message-form');
  const messageInput = document.getElementById('message-input');

  let conversations = [];
  let currentConversationIndex = 0;
  

  // Récupérer les conversations depuis conversations.json
  fetch('data/conversations.json')
    .then(response => response.json())
    .then(data => {
      conversations = data.conversations;
      displayConversations();
      displayMessages(currentConversationIndex);
    })
    .catch(error => {
      console.error('Error fetching conversations:', error);
    });

  // Afficher la liste des conversations
  function displayConversations() {
    conversationList.innerHTML = '';
    conversations.forEach((conversation, index) => {
      friend = conversation.participants[1];
      const lastMessage = conversation.messages[conversation.messages.length - 1];
      const conversationItem = document.createElement('li');
      conversationItem.classList.add('conversation-item');
      conversationItem.dataset.index = index;
      conversationItem.innerHTML = `
        <img src="${friend.profile_picture}" alt="Avatar" class="conversation-avatar">
        <div class="conversation-details">
          <div class="conversation-participants">${friend.name}</div>
          <div class="conversation-last-message">${lastMessage.content}</div>
        </div>
      `;
      conversationItem.addEventListener('click', () => {
        currentConversationIndex = index;
        displayMessages(currentConversationIndex);
      });
      conversationList.appendChild(conversationItem);
    });
  }

  // Afficher l'historique des messages pour une conversation
  function displayMessages(conversationIndex) {
    messageHistory.innerHTML = '';
    const conversation = conversations[conversationIndex];
    
    user = conversation.participants[0];
    friend = conversation.participants[1];
    conversation.messages.forEach(message => {
      const messageItem = document.createElement('li');
      messageItem.classList.add('message-item');
      console.log(message);
      console.log();
      messageItem.innerHTML = `
        <img src="${message.sender == "Jean" ? user.profile_picture : friend.profile_picture}" alt="Avatar" class="message-avatar">
        <div class="message-content">
          <div class="message-sender">${message.sender}</div>
          <div class="message-text">${message.content}</div>
          <div class="message-timestamp">${new Date(message.timestamp).toLocaleString()}</div>
        </div>
      `;
      messageHistory.appendChild(messageItem);
    });
  }

  // Gérer l'envoi de nouveaux messages
  newMessageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newMessageContent = messageInput.value.trim();
    if (newMessageContent !== '') {
      const newMessage = {
        sender: 'Jean',
        content: newMessageContent,
        timestamp: new Date().toISOString(),
        avatar: 'path/to/your/avatar.jpg' // Remplacez par le chemin de votre avatar
      };
      conversations[currentConversationIndex].messages.push(newMessage);
      console.log('New message:', conversations);
      displayMessages(currentConversationIndex);
      messageInput.value = '';
    }
  });

});