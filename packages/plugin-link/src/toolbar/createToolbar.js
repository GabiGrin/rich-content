import TextLinkButton from './TextLinkButton';

export default function createToolbar() {
  return {
    TextButtons: () => ({
      Link: TextLinkButton
    }),
    name: 'link',
  };
}
