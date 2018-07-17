import decorateComponentWithProps from 'decorate-component-with-props';
import {
  BoldButton,
  ItalicButton,
  UnderlineButton,
  IndentButton,
  BlockquoteButton,
  TextAlignmentButton,
  AlignTextLeftButton,
  AlignTextCenterButton,
  AlignTextRightButton,
  AlignTextJustifyButton,
  UnorderedListButton,
  OrderedListButton,
  TextLinkButton,
} from '../index';
import createThemedSeparator from './createThemedSeparator';
import HeadingSwitchButton from '../inline-styling/HeadingSwitchButton';

export default ({ buttons, theme, t, isMobile }) => {
  const themedSeparator = horizontal => createThemedSeparator({ theme, horizontal });

  const buttonByName = {
    Bold: BoldButton,
    Italic: ItalicButton,
    Underline: UnderlineButton,
    Indent: IndentButton,
    Title: HeadingSwitchButton,
    Blockquote: BlockquoteButton,
    Alignment: TextAlignmentButton,
    AlignLeft: AlignTextLeftButton,
    AlignCenter: AlignTextCenterButton,
    AlignRight: AlignTextRightButton,
    AlignJustify: AlignTextJustifyButton,
    OrderedList: OrderedListButton,
    UnorderedList: UnorderedListButton,
    Link: TextLinkButton, // TODO: should be added from plugin
    Separator: themedSeparator(false),
    HorizontalSeparator: themedSeparator(true),
  };

  const structure = buttons.map(buttonName => buttonByName[buttonName]);

  return structure.map(b => decorateComponentWithProps(b, { t, isMobile }));
};
