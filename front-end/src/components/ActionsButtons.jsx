export default function ActionsButtons({ type, onClick }) {
    const isDelete = type === "Delete";

    const iconSize = "16"; // Tamanho dos ícones

    const icon = isDelete ? (
        // Ícone de lixeira
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width={iconSize} height={iconSize}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7L5 7M10 11V17M14 11V17M5 7L6 19a2 2 0 002 2h8a2 2 0 002-2L19 7M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" />
        </svg>
    ) : (
        // Ícone de lápis
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width={iconSize} height={iconSize}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L13 14l-4 1 1-4 8.5-8.5z" />
        </svg>
    );

    const buttonClasses = isDelete
        ? 'bg-black text-white hover:bg-gray-800'
        : 'bg-transparent text-white hover:text-gray-300';

    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-1 px-3 py-1 text-sm rounded transition-colors duration-150 cursor-pointer ${buttonClasses}`}
        >
            {icon}
            {type}
        </button>
    );
}
