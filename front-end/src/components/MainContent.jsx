export default function MainContent({ selected }) {
    return (
        <div className="flex-1 p-6 bg-gray-100 overflow-auto" style={{ backgroundColor: '#f1f1eb' }}>
            <h1 className="text-2xl font-semibold mb-4">Conteúdo Principal</h1>
            <p className="text-lg">Você selecionou: <strong>{selected}</strong></p>
        </div>
    );
}
