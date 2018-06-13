import { EditorState, RichUtils, Modifier } from '@wix/draft-js';
import {
  hasLinksInSelection,
  removeLinksInSelection,
  isAtomicBlockFocused,
  removeBlock,
} from 'wix-rich-content-editor-common';
import { getStaticTextToolbarId } from './Toolbars/toolbar-id';
import { COMMANDS } from './keyBindings';

/* eslint-disable complexity */
export default updateEditorState => (
  (command, editorState) => {
    let newState, contentState;
    switch (command) {
      case COMMANDS.LINK:
        if (hasLinksInSelection(editorState)) {
          newState = removeLinksInSelection(editorState);
        } else {
          this.openLinkModal();
          return 'handled';
        }
        break;
      case COMMANDS.ALIGN_RIGHT:
      case COMMANDS.ALIGN_LEFT:
      case COMMANDS.ALIGN_CENTER:
      case COMMANDS.JUSTIFY:
        contentState = Modifier.mergeBlockData(editorState.getCurrentContent(), editorState.getSelection(), { textAlignment: command });
        newState = EditorState.push(editorState, contentState, 'change-block-data');
        break;
      case COMMANDS.TITLE:
      case COMMANDS.SUBTITLE:
      case COMMANDS.NUMBERED_LIST:
      case COMMANDS.BULLET_LIST:
      case COMMANDS.BLOCKQUOTE:
      case COMMANDS.CODE:
        newState = RichUtils.toggleBlockType(editorState, command);
        break;
      case COMMANDS.TAB:
        if (this.getToolbars().TextToolbar) {
          const staticToolbarButton = this.findFocusableChildForElement(`${getStaticTextToolbarId(this.refId)}`);
          staticToolbarButton && staticToolbarButton.focus();
          return 'handled';
        } else {
          this.editor.blur();
          return 'not-handled';
        }
      case COMMANDS.BACKSPACE:
      case COMMANDS.DELETE:
        if (isAtomicBlockFocused(editorState)) {
          newState = removeBlock(editorState, editorState.getSelection().getAnchorKey());
        }
        break;
      default:
        newState = RichUtils.handleKeyCommand(editorState, command);
        break;
    }

    if (newState) {
      updateEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  }
);
/* eslint-disable complexity */

