import {createDefinitionPanel} from '../src/DefinitionPanel';

describe('panel', () => {
  context('when initialized', () => {
    Given('panel', () => createDefinitionPanel());
    Let('panelDOM', function() { return this.panel.getDOMNode() });
    Then(function() { return this.panelDOM.style.display === 'none' })
    Then(function() { return this.panelDOM.innerText === '' })

    context('.show()', () => {
      When(function() { this.panel.show() })
      Then(function() { return this.panelDOM.style.display === 'block' })

      context('.hide()', () => {
        When(function() { this.panel.hide() })
        Then(function() { return this.panelDOM.style.display === 'none' })
      })
    })

    context('.updateDefinition()', () => {
      Given('def', function() { return {
        word: 'apple',
        header: 'noun',
        contents: ['first', 'second'],
      }})
      When(function() { this.panel.updateDefinition(this.def) })
      Then(function() { return this.panelDOM.innerText !== '' })

      context('.clear()', () => {
        When(function() { this.panel.clear() })
        Then(function() { return this.panelDOM.innerText === '' })
      })
    })
  })
})
