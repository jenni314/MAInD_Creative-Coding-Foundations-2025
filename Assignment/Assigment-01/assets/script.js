
// CHANGE VIEW OF THE CARD

// ELEMENT
const listBtn = document.getElementById('list-btn');
const cardBtn = document.getElementById('card-btn');
const recipeList = document.getElementById('recipe-list-container');
const ingredientList = document.getElementById('ingredient-list-container')

  function updateTagView(newClass) {
  recipeList.querySelectorAll('.tags-card-view, .tags-list-view')
    .forEach(wrap => wrap.className = newClass);
  }

  listBtn.addEventListener('click', () => {
  recipeList.classList.replace('card', 'list');
  updateTagView('tags-list-view');
  });

  cardBtn.addEventListener('click', () => {
  recipeList.classList.replace('list', 'card');
  updateTagView('tags-card-view');
  });





// COLOR SELECTION

// ELEMENTS
const addBtn = document.getElementById('save-button');
const recipeTitleContent = document.getElementById('recipe-name');
const recipeDescriptionContent = document.getElementById('recipe-description');
const recipeIngredientContent = document.getElementById('ingredient-tag');
const recipeListContainer = document.getElementById('recipe-list-container');

  // color tags
  const colorMap = {
    beige:  '#E2D9D7',
    grey:   '#CDD5D8',
    orange: '#FE9D8D',
    pink:   '#F7AECF',
    yellow: '#F3FE9E',
    green:  '#75DD9D',
    purple: '#ABC7E3',
    blue:   '#91DDF6'
  };

  // default color if not selector
  let selectedColor = colorMap.beige;

  // get color
  const colorSelector = document.getElementById('card-color');

  colorSelector?.addEventListener('click', (e) => {
  const btn = e.target.closest('#card-color button');
  if (!btn) return; 

    colorSelector.querySelectorAll('button').forEach(b => b.classList.remove('is-selected'));
    btn.classList.add('is-selected');

    selectedColor = colorMap[btn.id] || selectedColor;
  });


// ADD CARD

addBtn.addEventListener('click', (e) => {

  // ELEMENTS
  const title = (recipeTitleContent.value || '');
  const desc  = (recipeDescriptionContent.value || '');
  const ings  = (recipeIngredientContent.value || '')
                .split(/[,|\n]/g).map(s => s).filter(Boolean);

  const li = document.createElement('li');
  li.style.setProperty('--card-color', selectedColor);

  const content = document.createElement('div');
  content.id = 'recipe-content';

  // title row   
  const titleArea = document.createElement('div');
  titleArea.id = 'title-area';

  const titleEl = document.createElement('p');
  titleEl.id = 'recipe-title';
  titleEl.textContent = title;

  const delBtn = document.createElement('button');
  delBtn.id = 'delete-card';
  delBtn.className = 'tertiary-button';
  delBtn.type = 'button';
  delBtn.textContent = 'Delete';

  titleArea.appendChild(titleEl);
  titleArea.appendChild(delBtn);
  content.appendChild(titleArea);

  // description 
  const descEl = document.createElement('p');
  descEl.id = 'recipe-description-content';
  descEl.textContent = desc;
  content.appendChild(descEl);

  // tags
  const tagsWrap = document.createElement('div');
  tagsWrap.id = 'ingredient-list-container'; // ids repeat, ok for now
  tagsWrap.className = recipeListContainer.classList.contains('list')
    ? 'tags-list-view'
    : 'tags-card-view';

  ings.forEach(t => {
    const b = document.createElement('button');
    b.className = 'tag';
    b.type = 'button';
    b.textContent = t;
    tagsWrap.appendChild(b);
  });

  li.appendChild(content);
  li.appendChild(tagsWrap);
  recipeListContainer.appendChild(li);

  // reset inputs
  recipeTitleContent.value = '';
  recipeDescriptionContent.value = '';
  recipeIngredientContent.value = '';
  recipeTitleContent.focus();
});

// DELETE
recipeListContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('#delete-card');
  if (!btn) return;
  btn.closest('li')?.remove();
});
