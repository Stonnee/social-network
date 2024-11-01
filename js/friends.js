document.addEventListener('DOMContentLoaded', () => {
  const filterInput = document.getElementById('filter-input');
  const friendsList = document.getElementById('friends-list');
  const friendItems = friendsList.getElementsByClassName('friend-item');

  // Fonction de filtrage
  filterInput.addEventListener('input', () => {
    const filterValue = filterInput.value.toLowerCase();
    Array.from(friendItems).forEach(item => {
      const name = item.dataset.name.toLowerCase();
      if (name.includes(filterValue)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });



  // drag and drop
  let draggedItem = null;

  Array.from(friendItems).forEach(item => {
      // faire disparaitre le nom pendant déplacement
    item.addEventListener('dragstart', () => {
      draggedItem = item;
      setTimeout(() => {
        item.style.display = 'none';
      }, 0);
    });
    
    // annuler le déplacement
    item.addEventListener('dragend', () => {
      setTimeout(() => {
        draggedItem.style.display = 'flex';
        draggedItem = null;
      }, 0);
    });
    
    // permettre le drop
    item.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    
    //entre dans une zone de drop
    item.addEventListener('dragenter', (e) => {
      e.preventDefault();
      item.style.backgroundColor = '#cccccc';
    });
    
      //sort d'une zone de drop
    item.addEventListener('dragleave', () => {
      item.style.backgroundColor = '#ffffff';
    });

    item.addEventListener('drop', () => {
      friendsList.insertBefore(draggedItem, item);
      item.style.backgroundColor = '#ffffff';
    });
  });
});