export default function getSelectedText() {
  if (window.getSelection)
    return window.getSelection().toString();
  if (document.selection)
    return document.selection.createRange().text;
  return '';
};
