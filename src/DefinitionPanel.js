const panelBase = {
  show() {
    this.$el.style.display = 'block';
  },
  hide() {
    this.$el.style.display = 'none';
  },
  clear() {
    this.$el.innerHTML = '';
  },
  resetScroll() {
    this.$el.scrollTop = 0;
  },
  updateDefinition(def) {
    const toListItem = (text) => `<li style="font-size: 14px">${text}</li>`
    const content = `
    <h2 style="font-size: 22px; font-weight: normal">${def.word}</h2>
    <h3 style="font-size: 18px; font-weight: normal">${def.header}</h3>
    <ol style="list-style-type: decimal">
      ${def.contents.map(toListItem).join('')}
    </ol>
    `;
    this.$el.innerHTML = content;
  },
  getDOMNode() {
    return this.$el;
  }
}

function createDefinitionPanel() {
  const $el = document.createElement('div');

  Object.assign($el.style, {
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

  return Object.assign(Object.create(panelBase), {$el});
}

export {panelBase, createDefinitionPanel};
