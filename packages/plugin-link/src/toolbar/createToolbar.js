import TextLinkButton from './TextLinkButton';

export default function createToolbar() {
  return {
    TextButtonMapper: () => ({
      Link: {
        component: TextLinkButton,

        // display on mobile
        isMobile: true,

        // index of the button for various form-factors (allowed values: desktop, mobile)
        position: { mobile: 5 }
      }
    })
  };
}
