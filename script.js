const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

// Functions
function addItem(e){
  e.preventDefault();

  const newItem = itemInput.value;
  if (newItem === ''){
    alert('Please Add Item');
    return;
  }

  // Create List Item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Add To Dom
  itemList.appendChild(li);

  checkUI();

  itemInput.value = '';
}

function saveStorage(){
  const items = itemList.innerHTML;
  if (items != '' && items != null && items != undefined){ localStorage.setItem('items',items); }else{ localStorage.removeItem('items'); }
}

function loadStorage(){
  const items = localStorage.getItem('items');
  if (items != '' && items != null && items != undefined){ itemList.innerHTML = items; }
}

function createButton(classes){
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes){
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function removeItem(e){
  if (e.target.parentElement.classList.contains('remove-item')){
    // if (confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
      checkUI();
    // }
  }
}

function removeAll(){
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
    checkUI();
  }
}

function filterItems(e){
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  console.log(text,items);
    items.forEach(item =>{
      const itemName = item.firstChild.textContent.toLowerCase();
      if (text == '' || itemName.indexOf(text) != -1){  item.style.display = 'flex';
      }else{                                            item.style.display = 'none';
      }
    });
}

function checkUI(){
  saveStorage();
  const items = itemList.querySelectorAll('li');
  if (items.length === 0){
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  }else{
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

function initList(){
  loadStorage();
  checkUI();
}


// Event Listeners
itemForm.addEventListener('submit',addItem);
itemList.addEventListener('click',removeItem);
clearBtn.addEventListener('click',removeAll);
itemFilter.addEventListener('input',filterItems);

initList();