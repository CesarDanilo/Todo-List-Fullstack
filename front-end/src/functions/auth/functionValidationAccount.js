import { z } from "zod";
import axios from "axios";

export default async function validationAccount(data) {
    const emailSchema = z.string().email();
    const passwordSchema = z.string().min(4).max(24);

    const emailValid = emailSchema.safeParse(data.email);
    const passwordValid = passwordSchema.safeParse(data.password);

    try {

        if (!emailValid.success || !passwordValid.success) {
            console.log("Não foi possivel fazer o login!");
        }

        const response = axios.post();

    } catch (error) {
        console.log(error)
    }
}