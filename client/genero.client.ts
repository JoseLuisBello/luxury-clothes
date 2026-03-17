/**
 * Equipo #1
 * Hernández Sánchez Adrien
 * 16 de marzo de 2026
 */

import { apiFetch } from "@/lib/api";
import { GeneroResponse } from "@/types/Genero";

export const getGeneros = (): Promise<GeneroResponse> => {
    return apiFetch("/generos");
}