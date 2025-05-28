import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Seg", uv: 2 },
    { name: "Ter", uv: 3 },
    { name: "Qua", uv: 1 },
    { name: "Qui", uv: 4 },
    { name: "Sex", uv: 2 },
    { name: "Sáb", uv: 5 },
    { name: "Dom", uv: 0 },
];

export default function CardsGraficos() {
    return (
        <div className="w-full h-40">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.05} />
                    <XAxis dataKey="name" tick={{ fill: "#fff", fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fill: "#fff", fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#1f1f1f", border: "none" }}
                        labelStyle={{ color: "#fff" }}
                        itemStyle={{ color: "#fff" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="uv"
                        stroke="#6366f1"
                        fill="url(#colorUv)"
                    />
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
