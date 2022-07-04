import React from 'react';

import { Map } from './Map';

export default {
  title: 'Component/Map',
  component: Map,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = (args) => <Map {...args} />;

export const Default = Template.bind({});