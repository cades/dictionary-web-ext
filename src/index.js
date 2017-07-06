import getSelectedText from './getSelectedText';
import {createDefinitionPanel} from './DefinitionPanel';
import {getDefinitionOf} from './definition';

const panel = createDefinitionPanel();
var currentWord = '';

updateDefinitionPanelStatusOn('mouseup', 'mousedown', 'click');

function updateDefinitionPanelStatusOn(...events) {
  events.forEach((event) => document.body.addEventListener(event, updateDefinitionPanelStatus));
}

function updateDefinitionPanelStatus(e) {
  const clickOutOfPanel = () => !panel.getDOMNode().contains(e.target)
  const selectedText = getSelectedText();
  if (clickOutOfPanel() && !selectedText) {
    panel.hide();
    panel.clear();
  }

  if (currentWord === selectedText) return;

  currentWord = selectedText;
  getDefinitionOf(selectedText)
    .then((def) => {
      panel.updateDefinition(def);
      panel.resetScroll();
      panel.show();
    })
}

document.body.appendChild(panel.getDOMNode());
