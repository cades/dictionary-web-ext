document.body.addEventListener('mouseup', updateDefinitionPanelStatus);
document.body.addEventListener('mousedown', updateDefinitionPanelStatus);
document.body.addEventListener('click', updateDefinitionPanelStatus);
document.body.addEventListener('keyup', updateDefinitionPanelStatus);

function updateDefinitionPanelStatus(e) {
  const selectedText = getSelectedText();
  if (currentWord === selectedText) return;
  currentWord = selectedText;

  if (!selectedText && !definitionPanel.contains(e.target)) {
    hideDefinitionPanel();
    clearDefinitionPanel();
    return;
  }

  getDefinitionOf(selectedText).then(updateDefinition)
    .then(resetPanelScroll).then(showDefinitionPanel);
}

function getSelectedText() {
  if (window.getSelection)
    return window.getSelection().toString();
  if (document.selection)
    return document.selection.createRange().text;
  return '';
}

function showDefinitionPanel() {
  definitionPanel.style.display = 'block';
}

function hideDefinitionPanel() {
  definitionPanel.style.display = 'none';
}

function clearDefinitionPanel() {
  definitionPanel.innerHTML = '';
}

function resetPanelScroll() {
  definitionPanel.scrollTop = 0;
}

function getDefinitionOf(word) {
  return fetch(`http://www.dictionary.com/browse/${word}`)
    .then((resp) => resp.text())
    .then((html) => {
      const parser = new DOMParser();
      return parser.parseFromString(html, 'text/html');
    })
    .then((doc) => {
      const def = doc.querySelector('.def-list');
      const header = def.querySelector('header').innerText.trim();
      const contents = [].map.call(doc.querySelectorAll('.def-content'), (node) => node.innerText.trim());
      return { word, header, contents };
    })
}

function updateDefinition(def) {
  const content = `
    <h2 style="font-size: 22px; font-weight: normal">${def.word}</h2>
    <h3 style="font-size: 18px; font-weight: normal">${def.header}</h3>
    <ol style="list-style-type: decimal">
      ${def.contents.map((text) => {
          return '<li style="font-size: 14px">' + text + '</li>'
        }).join('')
      }
    </ol>
  `;
  definitionPanel.innerHTML = content;
}

const definitionPanel = document.createElement('div');
var currentWord = '';

Object.assign(definitionPanel.style, {
  position: 'fixed',
  display: 'none',
  right: '10px',
  bottom: '10px',
  width: `${window.innerWidth / 2}px`,
  height: `${window.innerHeight / 2}px`,
  backgroundColor: '#EFEFEF',
  border: 'solid 1px #FFCB51',
  overflowY: 'scroll',
  paddingLeft: '15px',
  paddingRight: '15px',
});

document.body.appendChild(definitionPanel);