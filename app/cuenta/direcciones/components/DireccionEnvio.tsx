export default function DireccionEnvio() {
    return(
        <div className="w-140 h-65">
            <h2 className="font-medium "> Direcciones de entrega predeterminada</h2>
            <div>
                <div className="flex flex-wrap justify-between">
                    <p className="text-gray-600">Magali Valeriano Lopez</p>
                    <p className="underline text-sm font-semibold">Editar</p>
                </div>
                <p className="text-gray-600">Calle Nezahual......</p>
                <p className="text-gray-600">Codigo postal</p>
            </div>
            <button 
                className="mt-6 bg-black text-white px-6 py-2.5 rounded-full font-medium hover:opacity-80 transition">
                    Agregar nueva direccion
            </button>
        </div>
    );
}