export default function DialogForm({ setIsOpen }) {
    return (
        <div className="fixed inset-0  bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4">NEW TASK</h2>
                <p className="mb-4">Conteúdo do modal aqui.</p>
                <div className="flex justify-end">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-[#707070] px-4 py-2 rounded cursor-pointer"
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-[#2196F3] text-white px-4 py-2 rounded hover:bg-[#2195f3de] cursor-pointer"
                    >
                        EDIT
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-[#4CAF50] text-white px-4 py-2 rounded hover:bg-[#4caf4fde] cursor-pointer"
                    >
                        DONE
                    </button>
                </div>
            </div>
        </div>
    );
}
