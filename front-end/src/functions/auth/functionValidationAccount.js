import { z } from "zod";
import axios from "axios";

export default async function validationAccount(data) {
    // Validação dos dados de entrada
    const emailSchema = z.string().email();
    const passwordSchema = z.string().min(4).max(24);

    const emailValid = emailSchema.safeParse(data.email);
    const passwordValid = passwordSchema.safeParse(data.password);

    const apiUrl = import.meta.env.VITE_API_URL

    if (!emailValid.success || !passwordValid.success) {
        throw new Error("Formato de email ou senha inválido");
    }

    try {
        const response = await axios.post(`${apiUrl}usuarios/auth/login`, data);

        // Verificação mais robusta da resposta
        if (response.status === 200 && response.data?.token && response.data?.dados) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.dados));

            return {
                success: true,
                data: response.data
            };
        }

        throw new Error("Resposta inesperada da API");

    } catch (error) {
        console.error("Erro durante login:", error);

        // Tratamento mais específico dos erros do Axios
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Erro com resposta do servidor (4xx, 5xx)
                const message = error.response.data?.message || "Credenciais inválidas";
                throw new Error(message);
            } else if (error.request) {
                // Requisição foi feita mas não houve resposta
                throw new Error("Sem resposta do servidor");
            } else {
                // Erro ao configurar a requisição
                throw new Error("Erro na configuração da requisição");
            }
        }

        // Para outros tipos de erro
        throw error;
    }
}