export default function DialogDelete({ onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-800">Confirmar exclusão</h2>
                </div>

                <p className="mt-4 text-gray-600">Você tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.</p>

                <div className="flex justify-end mt-6 gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    );
}
