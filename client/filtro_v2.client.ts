/**
 * Equipo #1
 * Hernández Sánchez Adrien
 * 16 de marzo de 2026
 */

import { apiFetch } from "@/lib/api";
import { FiltroV2Response } from "@/types/filtro_v2/filtro_v2";

/**
 * Funcion para obtener el filtro v2
 * @author Hernández Sánchez Adrien
 * @param id_categoria - ID de la categoría para filtrar
 * @returns Promesa que resuelve con la respuesta del filtro v2
 */
export const getFiltroV2 = ( id_categoria : number): Promise<FiltroV2Response> => {
    if (id_categoria === 0) {
        return Promise.reject(new Error("El ID de categoría no puede ser 0"));
    }
    
    return apiFetch(`/filtro_v2?id_categoria=${id_categoria}`);
}