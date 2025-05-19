import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validationAccount from '../../functions/auth/functionValidationAccount';
import CreateAccount from '../../functions/auth/functionCreateAccount';
import logohead from '../../img/logo/2.png';

export default function LoginScreen() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLoginAccount = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const result = await validationAccount({ email, password });

            if (result?.success) {
                setMessage('Login realizado com sucesso!');
                setEmail('');
                setPassword('');
                navigate('/dashboard');
            } else {
                setMessage(result?.message || 'Credenciais inválidas. Tente novamente.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Ocorreu um erro durante o login. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const result = await CreateAccount({ email, name, password });

            if (result?.success) {
                setMessage('Conta criada com sucesso!');
                setEmail('');
                setName('');
                setPassword('');
                setIsRegistering(false);
            } else {
                setMessage(result?.message || 'Erro ao criar conta. Verifique os dados.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setMessage('Ocorreu um erro ao criar a conta. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-xl p-8 space-y-6 border border-white/10">
                <div className="flex justify-center mb-4">
                    <img src={logohead} alt="Logo" className="h-16 object-contain" />
                </div>

                <h2 className="text-2xl font-semibold text-center text-white">
                    {isRegistering ? 'Criar Conta' : 'Login'}
                </h2>

                {message && (
                    <div
                        className={`p-3 text-sm text-center rounded-lg ${message.includes('sucesso')
                            ? 'bg-green-600/10 text-green-400'
                            : 'bg-red-600/10 text-red-400'
                            }`}
                    >
                        {message}
                    </div>
                )}

                <form
                    onSubmit={isRegistering ? handleCreateAccount : handleLoginAccount}
                    className="space-y-5"
                >
                    <div>
                        <label htmlFor="email" className="block text-sm text-white/70 mb-1">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seuemail@email.com"
                            required
                            className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                        />
                    </div>

                    {isRegistering && (
                        <div>
                            <label htmlFor="name" className="block text-sm text-white/70 mb-1">
                                Nome
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Seu nome completo"
                                required
                                className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="password" className="block text-sm text-white/70 mb-1">
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
                            className="w-full px-4 py-2 bg-zinc-800 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${isLoading
                            ? 'bg-white/20 text-white/60 cursor-not-allowed'
                            : 'bg-white text-black hover:bg-gray-200'
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-4 w-4 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                {isRegistering ? 'Criando...' : 'Entrando...'}
                            </span>
                        ) : isRegistering ? (
                            'Criar Conta'
                        ) : (
                            'Entrar'
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-white/40">
                    {isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
                    <button
                        type="button"
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setMessage('');
                        }}
                        className="text-white hover:underline"
                    >
                        {isRegistering ? 'Fazer login' : 'Criar conta'}
                    </button>
                </p>
            </div>
        </div>
    );
}
