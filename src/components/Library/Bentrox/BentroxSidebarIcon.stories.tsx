import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { colors } from "@utils/theme";

import BentroxSidebarIcon from "./BentroxSidebarIcon";

export default {
  title: "Bentrox/Bentrox Sidebar Icon",
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
} as ComponentMeta<typeof BentroxSidebarIcon>;

const Template: ComponentStory<typeof BentroxSidebarIcon> = (args) => (
  <BentroxSidebarIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {
  path: "icon-download",
  color: colors.primary,
  className: "",
};
