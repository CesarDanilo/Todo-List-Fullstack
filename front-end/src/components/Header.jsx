import ButtonNew from "./ButtonNew"

export default function Header({ title }) {
    return (
        <div className="p-4">
            <h1 className="text-lg">{title}</h1>
            <ButtonNew />
        </div>
    )
}