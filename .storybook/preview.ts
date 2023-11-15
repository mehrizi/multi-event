import type { Preview } from "@storybook/react";
const VIEWPORTS = {
  large:{
    name: "large (780px wide)",
    styles: {
      width: "780px",
      height: "980px",
    },
  },
  medium:{
    name: "medium (560px wide)",
    styles: {
      width: "560px",
      height: "690px",
    },
  },
  small:{
    name: "small (320px wide)",
    styles: {
      width: "320px",
      height: "400px",
    },
  },
  xsmall:{
    name: "xsmall (260px wide)",
    styles: {
      width: "260px",
      height: "330px",
    },
  },
};


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: VIEWPORTS, // newViewports would be an ViewportMap. (see below for examples)
      defaultViewport: 'small',
    },

  },
};

export default preview;
