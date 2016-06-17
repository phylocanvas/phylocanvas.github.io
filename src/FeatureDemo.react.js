import React from 'react';

import SyntaxHighlighter from './SyntaxHighlighter.react';

import { treeDefaults, renderingClientSide } from './utils';

const language = 'javascript';
const newickString = '(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;';

const standardConfig = {
  ...treeDefaults,
  history: false,
  contextMenu: false,
};

function standardInstance(containerElement) {
  const Phylocanvas = require('phylocanvas-quickstart');
  return Phylocanvas.createTree(containerElement, standardConfig);
}

const pluginInstances = {
  ['context-menu'](containerElement) {
    const Phylocanvas = require('phylocanvas-quickstart');
    return Phylocanvas.createTree(containerElement, {
      ...treeDefaults,
      history: false,
    });
  },
  history(containerElement) {
    const Phylocanvas = require('phylocanvas-quickstart');
    const tree = Phylocanvas.createTree(containerElement, {
      ...treeDefaults,
      contextMenu: false,
    });
    return tree;
  },
  metadata(containerElement) {
    const Phylocanvas = require('phylocanvas-quickstart');
    const tree = Phylocanvas.createTree(containerElement, {
      ...treeDefaults,
      history: false,
      contextMenu: false,
    });
    return tree;
  },
  ajax(containerElement) {
    const Phylocanvas = require('phylocanvas-quickstart');
    const tree = Phylocanvas.createTree(containerElement, {
      ...treeDefaults,
      history: false,
      contextMenu: false,
    });
    return tree;
  },
};

export default React.createClass({

  propTypes: {
    source: React.PropTypes.string.isRequired,
    directives: React.PropTypes.object,
  },

  componentDidMount() {
    if (renderingClientSide()) {
      const { source, directives } = this.props;
      const { noEval, noLoad, plugin } = directives;

      const fn = noEval ? () => {} : eval(`(function (tree) {${source}})`);

      const instance = (pluginInstances[plugin] || standardInstance)(this.refs.demo);
      if (noLoad) {
        return fn(instance);
      }
      instance.load(newickString, () => fn(instance));
    }
  },

  render() {
    const { source, directives } = this.props;
    return (
      <figure>
        <div
          ref="demo"
          className={`feature-demo ${directives.plugin ? 'feature-demo--large' : ''}`.trim()}
        ></div>
        { source ?
          <SyntaxHighlighter language={language}>
            {source}
          </SyntaxHighlighter> :
          null
        }
      </figure>
    );
  },

});
