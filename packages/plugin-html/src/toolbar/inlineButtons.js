import get from 'lodash/get';
import { translate } from 'react-i18next';
import {
  BUTTONS,
  SizeSmallLeftIcon,
  SizeSmallCenterIcon,
  SizeSmallRightIcon,
} from 'wix-rich-content-editor-common';
import EditIcon from '../icons/edit.svg';
import {
  MAX_ALIGNMENT_WIDTH,
  MIN_WIDTH,
  MAX_WIDTH,
  MIN_HEIGHT,
  MAX_HEIGHT,
  MAX_HEIGHT_INPUT,
  SRC_TYPE_HTML,
  SRC_TYPE_URL,
} from '../constants';
import EditPanel from './HtmlEditPanel';

const getAlignmentButtonProps = componentData => ({ disabled: get(componentData, 'config.width', 0) > MAX_ALIGNMENT_WIDTH });
const TOOLTIP_TEXT_BY_SRC_TYPE = {
  [SRC_TYPE_HTML]: 'HtmlPlugin_EditHtml_Tooltip',
  [SRC_TYPE_URL]: 'HtmlPlugin_EditUrl_Tooltip',
};
export default () => {
  return [
    {
      type: BUTTONS.INLINE_PANEL,
      keyName: 'edit',
      panelContent: translate(null)(EditPanel),
      icon: EditIcon,
      mapComponentDataToButtonProps: ({ src, srcType }) =>
        ({ tooltipTextKey: src ? TOOLTIP_TEXT_BY_SRC_TYPE[srcType] : 'HtmlPlugin_EditEmpty_Tooltip' }),
    },
    { type: BUTTONS.SEPARATOR },
    { type: BUTTONS.WIDTH, min: MIN_WIDTH, max: MAX_WIDTH },
    { type: BUTTONS.HEIGHT, min: MIN_HEIGHT, max: MAX_HEIGHT, inputMax: MAX_HEIGHT_INPUT },
    { type: BUTTONS.SEPARATOR },
    {
      type: BUTTONS.ALIGNMENT_LEFT,
      icon: SizeSmallLeftIcon,
      mapComponentDataToButtonProps: getAlignmentButtonProps,
    },
    {
      type: BUTTONS.ALIGNMENT_CENTER,
      icon: SizeSmallCenterIcon,
    },
    {
      type: BUTTONS.ALIGNMENT_RIGHT,
      icon: SizeSmallRightIcon,
      mapComponentDataToButtonProps: getAlignmentButtonProps,
    },
    { type: BUTTONS.SEPARATOR },
    { type: BUTTONS.DELETE, keyName: 'delete', mobile: true },
  ];
};
