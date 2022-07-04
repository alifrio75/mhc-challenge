import React from 'react';
import { within, userEvent } from '@storybook/testing-library';

import { Schedule } from './schedule';

export default {
  title: 'Component/Schedule',
  component: Schedule,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = (args) => <Schedule {...args} />;

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const Loaded = Template.bind({});
