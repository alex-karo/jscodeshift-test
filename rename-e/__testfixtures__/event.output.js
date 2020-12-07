function clickHandler(evt) {
  if (evt.currentTarget.style.textDecoration === 'line-through') {
    evt.currentTarget.style.textDecoration = 'none';
  } else {
    evt.currentTarget.style.textDecoration = 'line-through';
  }
}

export function renderTodoList(containerId, listOfStrings) {
  const list = document.createElement('ul');
  for (const str of listOfStrings) {
    const item = document.createElement('li');
    item.innerText = str;
    item.addEventListener('click', clickHandler);
    list.appendChild(item);
  }
  const container = document.getElementById(containerId).appendChild(list);
}
