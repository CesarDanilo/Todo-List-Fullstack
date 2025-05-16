export default function ButtonNew({ setIsOpen }) {
    return (
        <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 px-3 py-2 rounded bg-black text-white hover:bg-gray-800 transition-colors duration-150 cursor-pointer"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Add</span>
        </button>
    );
}
