export default function Cards({ title }) {
    return (
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 text-white w-1/4 p-4 rounded-xl flex flex-col items-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-lg mt-1">20</p>
        </div>
    );
}
