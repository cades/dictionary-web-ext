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

export {getDefinitionOf};
