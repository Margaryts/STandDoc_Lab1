import React from "react";
import Button from "../components/ui/Button";
import '../index.css';
export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select", options: ["primary", "secondary", "success", "danger"] },
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary Button",
  variant: "primary",
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary Button",
  variant: "secondary",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: "Disabled Button",
  variant: "primary",
  disabled: true,
};