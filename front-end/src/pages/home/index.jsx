import { useNavigate } from 'react-router-dom';
import logo from '../../img/logo/logo-oficial-homepage.png';
import logohead from '../../img/logo/2.png';

export default function HomePage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/usuarios/auth');
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans">
            {/* Navbar */}
            <nav className="w-full flex justify-between items-center px-6 py-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                    <img src={logohead} alt="Logo principal" className="h-12 md:h-14 object-contain" />
                </div>
                <button
                    onClick={handleLogin}
                    className="px-4 py-2 border border-white/20 text-white/80 rounded-lg hover:bg-white hover:text-black transition duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                >
                    Login
                </button>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between px-8 py-12 md:py-24 flex-1">
                <div className="md:w-1/2 space-y-6 text-center md:text-left max-w-xl">
                    <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-snug">
                        Organize sua <span className="text-white/60">vida</span> com nossa TodoList
                    </h2>
                    <p className="text-lg text-white/50 mx-auto md:mx-0">
                        Aumente sua produtividade com uma ferramenta minimalista, rápida e feita para o dia a dia.
                    </p>
                    <div className="mt-4">
                        <button
                            onClick={handleLogin}
                            className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            Começar agora
                        </button>
                    </div>
                </div>

                <div className="md:w-1/2 mt-10 md:mt-0">
                    <img
                        src={logo}
                        alt="Ilustração do sistema"
                        className="w-full max-w-sm md:max-w-md mx-auto opacity-90 object-contain"
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full border-t border-white/10 px-6 py-4 text-sm text-white/30">
                <p className="text-center">© 2025 Todo Master. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
