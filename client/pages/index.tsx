import { useEffect, useState } from "react";
import { TextInput, Box, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import getFormattedDate from "../helpers/getFormattedDate";
import getFormattedCardNumber from "../helpers/getFormattedCardNumber";
import { useHover } from "@mantine/hooks";
import box from "../styles/box.module.css";
import postData from "../api/postData";

const inputStyles = () => ({
    ".mantine-TextInput-wrapper": {
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        borderRadius: 10,
        marginBottom: 15,
    },
    ".mantine-TextInput-label": {
        color: "#fff",
    },

    ".mantine-TextInput-error": {
        display: "none",
    },
    ".mantine-TextInput-input:focus": {
        borderColor: "inherit",
    },
});

const Index = () => {
    const [valid, setValid] = useState(false);
    const { hovered, ref } = useHover();
    const form = useForm({
        initialValues: {
            cardNumber: "",
            expirationDate: "",
            cvv: "",
            amount: "",
        },
        validate: {
            cardNumber: (value) =>
                /^(\d{4}-\d{4}-\d{4}-\d{4})$/.test(value)
                    ? null
                    : "Invalid card number",
            expirationDate: (value) =>
                /\b\d{2}\b\/\b\d{4}\b/.test(value)
                    ? null
                    : "Invalid expiration date",
            cvv: (value) => (/\b\d{3}\b/.test(value) ? null : "Invalid cvv"),
            amount: (value) => (/\d/.test(value) ? null : "Invalid amount"),
        },
    });

    useEffect(() => {
        !form.validate().hasErrors ? setValid(true) : setValid(false);
    }, [form.values]);

    useEffect(() => {
        if (typeof form.values.expirationDate === "undefined") return;
        form.setFieldValue(
            "expirationDate",
            getFormattedDate(form.values.expirationDate)
        );
    }, [form.values.expirationDate]);

    useEffect(() => {
        if (typeof form.values.cardNumber === "undefined") return;
        form.setFieldValue(
            "cardNumber",
            getFormattedCardNumber(form.values.cardNumber)
        );
    }, [form.values.cardNumber]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        postData("http://localhost:8080/", form.values)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    return (
        <Box className={box.wrapper} mx="auto">
            <div
                className={box.gradient}
                style={{ opacity: hovered ? 1 : 0 }}
            />
            <form onSubmit={handleSubmit}>
                <TextInput
                    sx={inputStyles}
                    label={"Card number"}
                    {...form.getInputProps("cardNumber")}
                />
                <TextInput
                    sx={inputStyles}
                    label={"Expiration date"}
                    {...form.getInputProps("expirationDate")}
                />
                <TextInput
                    sx={inputStyles}
                    label={"CVV"}
                    {...form.getInputProps("cvv")}
                />
                <TextInput
                    sx={inputStyles}
                    label={"Amount"}
                    {...form.getInputProps("amount")}
                />
                <Group position="center" mt="md">
                    <Button type="submit" ref={ref} disabled={!valid}>
                        Оплатить
                    </Button>
                </Group>
            </form>
        </Box>
    );
};

export default Index;
