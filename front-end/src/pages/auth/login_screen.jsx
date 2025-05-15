import { useState } from 'react';
import validationAccount from '../../functions/auth/functionValidationAccount';
import CreateAccount from '../../functions/auth/functionCreateAccount';
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLoginAccount = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            const data = { email, password };
            const result = await validationAccount(data);

            if (result?.success) {
                setMessage("Login realizado com sucesso!");
                setEmail("");
                setPassword("");
                navigate("/dashboard"); // Redirect after successful login
            } else {
                setMessage(result?.message || "Credenciais inválidas. Tente novamente.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage("Ocorreu um erro durante o login. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");

        try {
            const data = { email, name, password };
            const result = await CreateAccount(data);

            if (result?.success) {
                setMessage("Conta criada com sucesso!");
                setEmail("");
                setName("");
                setPassword("");
                setIsRegistering(false); // Switch back to login form
            } else {
                setMessage(result?.message || "Erro ao criar conta. Verifique os dados.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setMessage("Ocorreu um erro ao criar a conta. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    {isRegistering ? 'Criar Conta' : 'Login'}
                </h2>

                {message && (
                    <div className={`mb-4 p-3 text-sm text-center rounded-lg ${message.includes("sucesso")
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                        {message}
                    </div>
                )}

                <form onSubmit={isRegistering ? handleCreateAccount : handleLoginAccount} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seuemail@email.com"
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {isRegistering && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nome
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Seu nome completo"
                                required
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            minLength={isRegistering ? 6 : 4}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {isRegistering ? 'Criando...' : 'Entrando...'}
                            </span>
                        ) : (
                            isRegistering ? 'Criar Conta' : 'Entrar'
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    {isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
                    <button
                        type="button"
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setMessage("");
                        }}
                        className="text-blue-600 hover:underline focus:outline-none"
                    >
                        {isRegistering ? 'Fazer login' : 'Criar conta'}
                    </button>
                </p>
            </div>
        </div>
    );
}