export default function DialogForm({ setIsOpen }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Título do Modal</h2>
                <p className="mb-4">Conteúdo do modal aqui.</p>
                <div className="flex justify-end">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}
