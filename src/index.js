import getSelectedText from './getSelectedText';
import {createDefinitionPanel} from './DefinitionPanel';
import {getDefinitionOf} from './definition';

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

document.body.appendChild(panel.getDOMNode());
