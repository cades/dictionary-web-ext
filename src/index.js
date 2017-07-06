import getSelectedText from './getSelectedText';
import {createDefinitionPanel} from './DefinitionPanel';

const panel = createDefinitionPanel();
var currentWord = '';

document.body.addEventListener('mouseup', updateDefinitionPanelStatus);
document.body.addEventListener('mousedown', updateDefinitionPanelStatus);
document.body.addEventListener('click', updateDefinitionPanelStatus);
document.body.addEventListener('keyup', updateDefinitionPanelStatus);

function updateDefinitionPanelStatus(e) {
  const selectedText = getSelectedText();
  if (currentWord === selectedText) return;
  currentWord = selectedText;

  if (!selectedText && !panel.getDOMNode().contains(e.target)) {
    panel.hide();
    panel.clear();
    return;
  }

  getDefinitionOf(selectedText)
    .then((def) => {
      panel.updateDefinition(def);
      panel.resetScroll();
      panel.show();
    })
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

document.body.appendChild(panel.getDOMNode());
