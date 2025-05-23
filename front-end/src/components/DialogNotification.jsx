import { useEffect, useState } from "react";

export default function DialogNotification({ task, show, onClose }) {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);
    }, [show]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-md p-6 mx-4 bg-white/10 border border-white/20 rounded-2xl shadow-xl text-white backdrop-blur-md">
                <h2 className="text-xl font-semibold mb-2">Lembrete de Tarefa</h2>
                <p className="text-sm text-gray-300 mb-4">
                    A tarefa <span className="font-medium text-white">"{task?.title}"</span> está agendada para agora.
                </p>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 transition"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}

// MODO DE USAR ESSE COMPONENTE
{/* <DialogNotification
  task={{ title: "Reunião com equipe" }}
  show={true} // altere esse estado conforme a lógica da tarefa
  onClose={() => setShowModal(false)}
/> */}