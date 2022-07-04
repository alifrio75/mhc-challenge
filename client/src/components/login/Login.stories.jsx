import React from 'react';

import { Login } from './Login';

export default {
  title: 'Page/Login',
  component: Login,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = (args) => <Login {...args} />;

export const Default = Template.bind({});
Default.args = {
  user: {
    name: 'Jane Doe',
  },
  onLogout: () => alert('Logout')
};

