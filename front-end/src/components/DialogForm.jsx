import { useEffect, useState } from 'react';
import { registerTasks } from '../functions/registerTask';
import axios from 'axios';

export default function DialogForm({ setIsOpen, fetchTarefas, dados }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [active, setActive] = useState(false);
    const [userId, setUserId] = useState();

    const apiUrl = import.meta.env.VITE_API_URL_TASKS

    useEffect(() => {
        if (dados) {
            setTitle(dados.title || '');
            setDescription(dados.task_description || '');
            if (dados.data) {
                const localDateTime = new Date(dados.data);
                const offset = localDateTime.getTimezoneOffset();
                localDateTime.setMinutes(localDateTime.getMinutes() - offset);
                localDateTime.setHours(localDateTime.getHours() + 3);
                setDate(localDateTime.toISOString().slice(0, 16));
            } else {
                setDate('');
            }
            setActive(dados.task_status || false);
        } else {
            setTitle('');
            setDescription('');
            setDate('');
            setActive(false);
        }
    }, [dados]);

    useEffect(() => {
        loadUserIdFromLocalStorage();
    }, [])

    const loadUserIdFromLocalStorage = () => {
        try {
            const userString = localStorage.getItem('user');
            if (!userString) return;
            const user = JSON.parse(userString);
            if (user?.userId) setUserId(user.userId);
        } catch (error) {
            console.log(`ERROR! Não foi possível buscar o id de usuário: ${error}`);
        }
    };

    const handleDone = async () => {
        const taskData = {
            user_id: userId,
            title,
            task_description: description,
            data: date,
            task_status: active
        };
        if (await registerTasks(taskData)) {
            setIsOpen(false);
            fetchTarefas();
        }
    };

    const handleEdit = async () => {
        const updatedData = {
            title,
            task_description: description,
            data: date,
            task_status: active
        };
        try {
            console.log(`LINK DO EDIT: ${apiUrl}tarefas/${dados.id}`)
            await axios.put(`${apiUrl}tarefas/${dados.id}`, updatedData);
            fetchTarefas();
            setIsOpen(false);
        } catch (error) {
            console.error('Erro ao editar tarefa:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-zinc-900 text-white rounded-2xl p-6 w-full max-w-md shadow-lg">
                <div className="flex gap-4 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 text-gray-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <h2 className="text-xl font-semibold">{dados ? 'EDIT TASK' : 'NEW TASK'}</h2>
                </div>

                {/* Title */}
                <div className="flex gap-2 mt-4 items-center text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    <h2 className="font-semibold">Title</h2>
                </div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Digite o título"
                    className="w-full px-3 py-2 mt-1 border border-gray-600 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                />

                {/* Description */}
                <div className="flex gap-2 mt-5 items-center text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    <h2 className="font-semibold">Description</h2>
                </div>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Digite uma descrição..."
                    className="w-full px-3 py-2 mt-1 border border-gray-600 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                />

                {/* Date */}
                <div className="flex gap-2 mt-5 items-center text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" />
                    </svg>
                    <h2 className="font-semibold">Date</h2>
                </div>
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 mt-1 border border-gray-600 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-white"
                />

                {/* Active */}
                <div className="flex items-center gap-3 mt-5">
                    <input
                        type="checkbox"
                        checked={active}
                        onChange={(e) => setActive(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-600 bg-zinc-800 border-gray-600 rounded focus:ring-1 focus:ring-white"
                    />
                    <label htmlFor="active" className="font-medium text-gray-300">Active?</label>
                </div>

                {/* Buttons */}
                <div className="flex justify-end mt-6 gap-2">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-300 px-4 py-2 rounded hover:bg-zinc-700 transition"
                    >
                        CANCEL
                    </button>
                    {dados ? (
                        <button
                            onClick={handleEdit}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            EDIT
                        </button>
                    ) : (
                        <button
                            onClick={handleDone}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            DONE
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
