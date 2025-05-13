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
        return {
            success: false,
            message: "Dados inválidos. Verifique os campos preenchidos.",
            errors: {
                email: emailValid.error?.issues,
                name: nameValid.error?.issues,
                password: passwordValid.error?.issues,
            },
        };
    }

    try {
        const response = await axios.post("http://localhost:3001/usuarios/auth/register", {
            name: data.name,
            email: data.email,
            password: data.password,
        });

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error("Erro ao criar conta:", error);

        return {
            success: false,
            message:
                error?.response?.data?.message ||
                "Erro ao criar conta. Verifique os dados e tente novamente.",
            status: error?.response?.status,
            backendErrors: error?.response?.data,
        };
    }
}
