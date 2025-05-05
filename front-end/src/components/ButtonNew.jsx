
export default function ButtonNew() {
    return (
        <button type="submit" className="flex w-20 h-auto p-2 rounded-sm bg-black text-white cursor-pointer gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <p>NEW</p>
        </button>
    )
}