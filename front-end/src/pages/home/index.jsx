import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/usuarios/auth');
    };

    const handleRegister = () => {
        navigate('/usuarios/create');
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Navbar */}
            <header className="w-full flex justify-between items-center px-8 py-6 border-b border-white/10">
                <h1 className="text-2xl font-bold">TodoMaster</h1>
                <div className="space-x-4">
                    <button
                        onClick={handleLogin}
                        className="px-5 py-2 border border-white text-white rounded-lg transition duration-200 hover:bg-white hover:text-black"
                    >
                        Login
                    </button>
                    {/* <button
                        onClick={handleLogin}
                        className="px-5 py-2 bg-white text-black rounded-lg transition duration-200 hover:bg-gray-300"
                    >
                        Criar Conta
                    </button> */}
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex flex-col md:flex-row items-center justify-between px-8 py-20 flex-1">
                {/* Text Section */}
                <div className="md:w-1/2 space-y-6">
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                        Organize sua <span className="text-white/70">vida</span> com nossa TodoList
                    </h2>
                    <p className="text-lg text-white/60">
                        Aumente sua produtividade com uma ferramenta minimalista, rápida e feita para o dia a dia.
                    </p>
                    <div className="space-x-4">
                        <button
                            onClick={handleLogin}
                            className="px-6 py-3 bg-white cursor-pointer text-black rounded-lg transition duration-200 hover:bg-gray-300"
                        >
                            Começar Agora
                        </button>
                        {/* <button
                            onClick={handleLogin}
                            className="px-6 py-3 border border-white cursor-pointer text-white rounded-lg transition duration-200 hover:bg-white hover:text-black"
                        >
                            Fazer Login
                        </button> */}
                    </div>
                </div>

                {/* Image Section */}
                <div className="md:w-1/2 mt-10 md:mt-0">
                    <img
                        src="/assets/img/todolist-hero.png"
                        alt="Ilustração do sistema"
                        className="w-full max-w-md mx-auto"
                    />
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-black border-t border-white/10 px-8 py-6">
                <p className="text-center text-white/40 text-sm">© 2025 TodoMaster. Todos os direitos reservados.</p>
                <div className="flex items-center justify-center space-x-6 mt-4">
                    <img src="/assets/img/logo1.svg" alt="Logo 1" className="h-6" />
                    <img src="/assets/img/logo2.svg" alt="Logo 2" className="h-6" />
                    <img src="/assets/img/logo3.svg" alt="Logo 3" className="h-6" />
                </div>
            </footer>
        </div>
    );
}
