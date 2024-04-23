import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { colors } from "@utils/theme";

import SidebarIcon from "./SidebarIcon";

export default {
  title: "Sidebar Icon",
  argTypes: {
    path: {
      description: "Icon name",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    color: {
      description: "Icon color",
      table: {
        type: {
          summary: "string",
        },
      },
      control: "color",
    },
    size: {
      description: "Icon size",
      table: {
        type: {
          summary: "string",
        },
      },
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl", "xxl"],
      },
    },
    className: {
      description: "Custom CSS className",
      table: {
        type: {
          summary: "string",
        },
      },
    },
  },
} as ComponentMeta<typeof SidebarIcon>;

const Template: ComponentStory<typeof SidebarIcon> = (args) => (
  <SidebarIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {
  path: "icon-download",
  color: colors.primary,
  className: "",
};
