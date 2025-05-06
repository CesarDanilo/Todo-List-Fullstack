export default function ActionsButtons({ type, onClick }) {
    const isDelete = type === "Delete";
    const buttonClasses = isDelete
        ? 'bg-black text-white hover:bg-gray-800'
        : 'bg-white text-black border border-black hover:bg-gray-100';
    const buttonText = isDelete ? 'Delete' : 'Edit';

    return (
        <button
            type="button"
            className={`px-4 py-2 rounded ${buttonClasses} cursor-pointer`}
            onClick={onClick}
        >
            {buttonText}
        </button>
    );
}
