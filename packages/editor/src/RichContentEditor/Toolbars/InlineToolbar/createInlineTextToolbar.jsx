
import get from 'lodash/get';
import createInlineToolbar from './createInlineToolbar';
import { DesktopTextButtonList } from '../buttons/';
import { getTextButtonsFromList } from '../buttons/utils';


export default config => {
  const {
    buttons,
    pluginTextButtons,
    defaultTextAlignment,
    pubsub,
    theme,
    isMobile,
    helpers,
    anchorTarget,
    relValue,
    t,
  } = config;
  const pluginButtons = pluginTextButtons.reduce((buttons, buttonFn) => {
    return Object.assign(buttons, buttonFn());
  }, {});

  const pluginButtonNames = Object.keys(pluginButtons);
  const textButtons = get(buttons, 'desktop', [...DesktopTextButtonList, ...pluginButtonNames]);
  const structure = getTextButtonsFromList({ buttons: textButtons, pluginButtons, pubsub, theme, t });

  return createInlineToolbar({
    name: 'InlineTextToolbar',
    structure,
    defaultTextAlignment,
    pubsub,
    theme,
    isMobile,
    helpers,
    anchorTarget,
    relValue,
    t
  });
};
