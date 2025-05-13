import axios from "axios";
import { z } from "zod";

export default async function CreateAccount(data) {
    const emailSchema = z.string().email();
    const nameSchema = z.string().min(4).max(24);
    const passwordSchema = z.string().min(4).max(24);

    const emailValid = emailSchema.safeParse(data.email);
    const nameValid = nameSchema.safeParse(data.name);
    const passwordValid = passwordSchema.safeParse(data.password);

    if (!emailValid.success || !nameValid.success || !passwordValid.success) {
        console.log("Erro de validação:", {
            name: nameValid.error?.issues,
            email: emailValid.error?.issues,
            password: passwordValid.error?.issues,
        });
        return { success: false, message: "Dados inválidos." };
    }

    try {
        const response = await axios.post("/api/register", {
            name: data.name,
            email: data.email,
            password: data.password,
        });
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Erro ao criar conta:", error);
        return { success: false, message: "Erro ao criar conta." };
    }
}
