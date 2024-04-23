/* eslint-disable no-alert */
import React, { useState } from "react";

import Button from "@components/Library/Button";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import BentroxModal from "./BentroxModal";

export default {
  title: "Bentrox/Bentrox Modal",
  parameters: {
    docs: {
      description: {
        component: "Modal Confirm, extends BentroxModal.",
      },
    },
  },
  argTypes: {
    closeHandler: {
      control: { type: null },
      description: "Handler to close modal.",
      table: {
        type: { summary: "Function" },
      },
    },
    size: {
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "xs" },
      },
      control: {
        type: "select",
        options: ["mini", "tiny", "small", "large", "big", "huge", "massive"],
      },
    },
  },
} as ComponentMeta<typeof BentroxModal>;

const Template: ComponentStory<typeof BentroxModal> = (args) => {
  const [open, setOpen] = useState(false);
  const [withActions, setWithActionsOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(!open);
        }}
      >
        Show Modal
      </Button>
      <BentroxModal open={!!open} {...args} closeHandler={() => setOpen(false)}>
        <BentroxModal.Content>
          <p>Content</p>
        </BentroxModal.Content>
        <BentroxModal.Actions>
          <Button
            pill
            color="default"
            outline
            onClick={() => setWithActionsOpen(false)}
          >
            Dismiss
          </Button>
          <Button
            pill
            color="success"
            onClick={() => setWithActionsOpen(false)}
          >
            Confirm
          </Button>
        </BentroxModal.Actions>
      </BentroxModal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Modal Title",
  onDismiss: () => alert("canceled"),
  onConfirm: () => alert("confirmed"),
};
