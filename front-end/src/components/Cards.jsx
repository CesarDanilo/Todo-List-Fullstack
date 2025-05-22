export default function Cards({ title, value }) {
    return (
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 text-white 
        w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 
        p-3 sm:p-4 rounded-xl flex flex-col items-center">
            <h2 className="text-sm sm:text-base lg:text-xl font-semibold">{title}</h2>
            <p className="text-xs sm:text-sm lg:text-lg mt-0.5 sm:mt-1">{value}</p>
        </div>
    );
}
