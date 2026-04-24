/**
 * @author Adrien Hernández Sánchez
 * Servicio para obtener el filtro nuevo.
 */

import { FilterV2Repository } from "@/repositories/filtro_v2/filtro_v2.repository";

export class FilterV2Service {
    /**
     * Función para obtener los filtros de una categoría específica
     * @author Adrien Hernández Sánchez
     * @param id_categoria - ID de la categoría para la cual se desean obtener los filtros
     * @returns Filtro de catalogo
     */
    static async getFilterByCategory( id_categoria : number ) {
        return await FilterV2Repository.getFiltersByCategory(id_categoria);
    }
}