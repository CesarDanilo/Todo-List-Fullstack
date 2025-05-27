import CardsGraficos from "./CardsGraficos";

export default function Cards({ title, value }) {
    return (
        <div className="bg-white/5 border border-white/10 text-white 
    w-full sm:w-2/3 lg:w-1/2 xl:w-1/1 
    p-4 rounded-2xl flex flex-col items-center justify-between gap-4">

            <div className="flex justify-center gap-2 w-full items-center text-center">
                <h2 className="text-base sm:text-lg font-medium tracking-wide">
                    {title}
                </h2>
                {/* <p className="text-lg sm:text-2xl font-bold opacity-90 mt-1">
                    {value}
                </p> */}
            </div>

            <div className="w-full h-36">
                <CardsGraficos />
            </div>
        </div>

    );
}
