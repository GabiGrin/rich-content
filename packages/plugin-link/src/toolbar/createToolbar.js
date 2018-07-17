import TextLinkButton from './TextLinkButton';

export default function createToolbar() {
  return {
    TextButtonMapper: () => ({
      Link: {
        component: TextLinkButton,
        isMobile: true
      }
    })
  };
}
