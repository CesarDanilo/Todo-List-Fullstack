
export default function ButtonNew({ setIsOpen }) {
    return (
        <button type="submit" onClick={() => setIsOpen(true)} className="flex w-20 h-auto p-2 rounded-md bg-black text-white cursor-pointer gap-1 hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <p>Add</p>
        </button>
    )
}