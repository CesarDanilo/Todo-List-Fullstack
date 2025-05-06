import { useState } from "react"; // ✅ Importar useState
import ButtonNew from "./ButtonNew";
import DialogForm from "./DialogForm";

export default function Header({ title, onTaskSaved  }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex p-4 w-full justify-between items-center">
            <h1 className="text-lg font-semibold">{title}</h1>

            {/* Botão que abre o modal */}
            <ButtonNew setIsOpen={setIsOpen} />

            {/* Modal (condicional) */}
            {isOpen && (
                <DialogForm setIsOpen={setIsOpen} onTaskSaved={onTaskSaved}/>
            )}
        </div>
    );
}
