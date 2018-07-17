
import get from 'lodash/get';
import createInlineToolbar from './createInlineToolbar';
import { DesktopTextButtonList } from '../buttons/';
import {
  getTextButtonsFromList,
  reducePluginTextButtons,
  reducePluginTextButtonNames,
  mergeButtonLists } from '../buttons/utils';

export default config => {
  const {
    buttons,
    pluginTextButtonMappers,
    defaultTextAlignment,
    pubsub,
    theme,
    isMobile,
    helpers,
    anchorTarget,
    relValue,
    t,
  } = config;

  const pluginButtons = reducePluginTextButtons(pluginTextButtonMappers);
  const pluginButtonNames = reducePluginTextButtonNames(pluginTextButtonMappers);
  const buttonNameList = mergeButtonLists(DesktopTextButtonList, pluginButtonNames,
    list => list.length > 0 ? [{ name: 'Separator' }, ...list] : list);
  const textButtons = get(buttons, 'desktop', buttonNameList);
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
