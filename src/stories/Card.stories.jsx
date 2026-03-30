import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import '../index.css';

export default {
    title: "Components/Card",
    component: Card,
    argTypes: {
        title: { control: "text" },
        content: { control: "text" },
        buttonText: { control: "text" },
        variant: {
            control: { type: "select", options: ["primary", "secondary", "success", "danger"] },
        },
    },
};

const Template = ({ title, content, buttonText, variant }) => (
    <Card className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{content}</p>
        <Button variant={variant}>{buttonText}</Button>
    </Card>
);

export const InfoCard = Template.bind({});
InfoCard.args = {
    title: "Інформаційна картка",
    content: "Це приклад базового контенту в картці.",
    buttonText: "Детальніше",
    variant: "primary",
};

export const WarningCard = Template.bind({});
WarningCard.args = {
    title: "Попередження!",
    content: "Це важлива інформація для користувача.",
    buttonText: "Видалити",
    variant: "danger",
};

export const SuccessCard = Template.bind({});
SuccessCard.args = {
    title: "Успішно",
    content: "Операція виконана успішно.",
    buttonText: "Гаразд",
    variant: "success",
};