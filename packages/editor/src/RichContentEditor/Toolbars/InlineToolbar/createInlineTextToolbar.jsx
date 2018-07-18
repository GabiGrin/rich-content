
import get from 'lodash/get';
import createInlineToolbar from './createInlineToolbar';
import { DesktopTextButtonList } from '../buttons/';
import { getTextButtonsFromList, reducePluginTextButtons, reducePluginTextButtonNames, mergeButtonLists } from '../buttons/utils';

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

  const appendSeparator = ({ mergedList, sourceList, buttonData, formFactor }) => {
    if (mergedList.length === sourceList.length &&
      (!buttonData.position || buttonData.position[formFactor] === undefined ||
        buttonData.position[formFactor] < 0 || buttonData.position[formFactor] > mergedList.length)) {
      return [...mergedList, 'Separator'];
    }
    return mergedList;
  };

  const pluginButtons = reducePluginTextButtons(pluginTextButtonMappers);
  const pluginButtonNames = reducePluginTextButtonNames(pluginTextButtonMappers);
  const mergedList = mergeButtonLists(DesktopTextButtonList, pluginButtonNames, 'desktop', appendSeparator);
  const textButtons = get(buttons, 'desktop', mergedList);
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
