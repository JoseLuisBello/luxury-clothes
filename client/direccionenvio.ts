import { apiFetch } from "@/lib/api";

import { DireccionEnvio } from "@/types/direccionesenvio/DireccionesEnvio";

//mostrar la lista de direcciones de envio disponnibles
export const getTodasLasDirecciones = (id_cliente: number) : Promise<DireccionEnvio> => {
    return apiFetch(`/direcciondeenvio?clientId=${id_cliente}`);
}