import getSelectedText from './getSelectedText';
import {createDefinitionPanel} from './DefinitionPanel';
import {getDefinitionOf} from './definition';

const panel = createDefinitionPanel();
var currentWord = '';

updateDefinitionPanelStatusOn('mouseup', 'mousedown', 'click', 'keyup');

function updateDefinitionPanelStatusOn(...events) {
  events.forEach((event) => document.body.addEventListener(event, updateDefinitionPanelStatus));
}

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

document.body.appendChild(panel.getDOMNode());
