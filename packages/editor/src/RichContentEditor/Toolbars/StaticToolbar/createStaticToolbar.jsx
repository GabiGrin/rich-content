import decorateComponentWithProps from 'decorate-component-with-props';
import camelCase from 'lodash/camelCase';
import StaticToolbar from './StaticToolbar';
import { simplePubsub } from 'wix-rich-content-common';

export default (config = {}) => {
  const pubsub = simplePubsub();

  const {
    name = 'StaticToolbar',
    theme,
    structure = [],
    isMobile = false,
    helpers,
    linkModal = false,
    anchorTarget,
    relValue,
    t,
    id
  } = config;

  const toolbarProps = {
    pubsub,
    structure,
    theme,
    isMobile,
    helpers,
    linkModal,
    anchorTarget,
    relValue,
    t,
    id,
    dataHook: camelCase(name),
  };

  return {
    name,
    initialize: ({ getEditorState, setEditorState }) => {
      pubsub.set('getEditorState', getEditorState);
      pubsub.set('setEditorState', setEditorState);
    },
    // Re-Render the text-toolbar on selection change
    onChange: editorState => {
      pubsub.set('selection', editorState.getSelection());
      return editorState;
    },
    Toolbar: decorateComponentWithProps(StaticToolbar, toolbarProps),
  };
};

