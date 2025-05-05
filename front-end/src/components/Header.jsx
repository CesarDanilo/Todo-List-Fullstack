import ButtonNew from "./ButtonNew"

export default function Header({ title }) {
    return (
        <div className="flex p-4 w-full justify-between ">
            <h1 className="text-lg">{title}</h1>
            <ButtonNew />
        </div>
    )
}