import { useState } from 'react';
import validationAccount from '../../functions/auth/functionValidationAccount';
import CreateAccount from '../../functions/auth/functionCreateAccount';

export default function LoginScreen() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLoginAccount = async (e) => {
        e.preventDefault();
        const data = { email, password };

        console.log("dados enviados: ", data)
        const result = await validationAccount(data)

        if (result.success) {
            setMessage("Conta logada com sucesso!");
            // Limpa os campos
            setEmail("");
            setPassword("");
            setIsRegistering(false); // opcional: redireciona para tela de login
        } else {
            setMessage(result.message || "Erro ao logar conta.");
        }
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        const data = { email, name, password };
        console.log(data)

        const result = await CreateAccount(data);
        if (result.success) {
            setMessage("Conta criada com sucesso!");
            // Limpa os campos
            setEmail("");
            setName("");
            setPassword("");
            setIsRegistering(false); // opcional: redireciona para tela de login
        } else {
            setMessage(result.message || "Erro ao criar conta.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    {isRegistering ? 'Criar Conta' : 'Login'}
                </h2>

                {message && (
                    <div className="mb-4 text-sm text-center text-red-600">
                        {message}
                    </div>
                )}

                <form className="space-y-5">
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
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={isRegistering ? handleCreateAccount : handleLoginAccount}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {isRegistering ? 'Criar Conta' : 'Entrar'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    {isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
                    <button
                        type="button"
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setMessage(""); // limpa mensagem ao trocar de modo
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
