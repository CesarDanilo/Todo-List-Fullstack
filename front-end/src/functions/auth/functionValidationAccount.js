import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default async function validationAccount(data) {
    const emailSchema = z.string().email();
    const passwordSchema = z.string().min(4).max(24);

    // You can't use useNavigate here because this is not a React component
    // const navigate = useNavigate();

    const emailValid = emailSchema.safeParse(data.email);
    const passwordValid = passwordSchema.safeParse(data.password);

    if (!emailValid.success || !passwordValid.success) {
        console.log("Não foi possivel fazer o login!");
        throw new Error("Invalid email or password format");
    }

    try {
        const response = await axios.post('http://localhost:3001/usuarios/auth/login', data);
        console.log("Login feito com sucesso: ", response.status);

        if (response.status === 200 && response.data) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.dados));
            console.log("Dados gravados no localStorage");

            return response.data; // Return the response data for the component to use
        }
    } catch (error) {
        console.error("Error during login:", error);
        throw error; // Re-throw the error so the calling component can handle it
    }
}