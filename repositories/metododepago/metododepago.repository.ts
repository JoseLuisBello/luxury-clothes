/**
 * Equipo #1
 * Diaz Antonio Luis Pedro
 * 24 de febrero de 2026
 */
import { pool } from "@/lib/db";

// clase principal de metodos de pago
export class MetodoDePagoRepository {

    // ver los metodos de pago disponible
    static async Ver(id_cliente: number) {
        const { rows } = await pool.query(
            `SELECT * FROM "MetodoDePago"
                WHERE "id_cliente" = $1`,
            [id_cliente]
        );
        return rows;
    }

    // Obtener los tipos 
    static async obtenerTipos() {
        const { rows } = await pool.query(
            `SELECT * FROM "TipoMetodoDePago"`
        );

        return rows;
    }

    static async obtenermetodo(id_cliente: number, id_metodo: number) {
        const { rows } = await pool.query(
            `SELECT * FROM "MetodoDePago"
                WHERE "id_cliente" = $1 AND "id" = $2`,
            [id_cliente, id_metodo]
        );
        return rows[0];
    }

    // Agregar nuevo metodo
    // 1	Tarjeta de crédito              requiere numero de tarjeta, fecha de vencimiento y nombre titular
    // 2	Tarjeta de débito	            requiere numero de tarjeta, fecha de vencimiento y nombre titular
    // 3	Transferencia bancaria          requiere numero Clave (18 digitos), nombre titular y banco 
    // 4	PayPal                          requiere solo correo
    // 5	Mercado Pago	                requiere correo electronico o ID de usuario de Mercado Pago
    // 6	Apple Pay                       Solo pide verifacion con biometrica ya registradas en el celular 
    // 7	Google Pay	                    Solo pide verifacion con biometrica ya registradas en el celular 

    static async agregarMetodo(
        id_cliente: number,
        id_tipo: number,
        numero_cuenta: string | null,
        nombre_titular: string | null,
        fecha_vencimiento: string | null,
        banco: string | null,
        correo: string | null,
        proveedor: string | null) {

        const { rows } = await pool.query(
            `INSERT INTO "MetodoDePago" ("id_cliente", "id_tipo", "numero_cuenta", "nombre_titular", "fecha_vencimiento", "banco", "correo", "proveedor") 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [id_cliente, id_tipo, numero_cuenta, nombre_titular, fecha_vencimiento, banco, correo, proveedor]
        );
        return rows[0];
    }

    static async modificarMetodo(
        id_cliente: number,
        id_metodo: number,
        numero_cuenta: string | null,
        nombre_titular: string | null,
        fecha_vencimiento: string | null,
        banco: string | null,
        correo: string | null,
        proveedor: string | null
    ) {
        // solo permitir cambios en el mismo metodo, si quiere un nuevo tipo debe agregar un nuevo metodo
        const { rows } = await pool.query(
            `UPDATE "MetodoDePago" SET 
            "numero_cuenta" = $1, "nombre_titular" = $2, "fecha_vencimiento" = $3, "banco" = $4, "correo" = $5, "proveedor" = $6            
            WHERE "id_cliente" = $7 AND "id" = $8
             RETURNING *`,
            [numero_cuenta, nombre_titular, fecha_vencimiento, banco, correo, proveedor, id_cliente, id_metodo]
        );
        // Ejemplo de Update en base
        // UPDATE "MetodoDePago" SET 
        // "numero_cuenta" = null, "nombre_titular" = null , "fecha_vencimiento" = null , "banco" = null , "correo" = null , "proveedor" = 'Apple Pay'
        // WHERE "id_cliente" = 1 AND "id" = 7
        // RETURNING *;
        return rows[0] ?? null;
    }

    static async eliminarMetodo(
        id_cliente: number,
        id_metodo: number) {

        const { rows } = await pool.query(
            `DELETE FROM  "MetodoDePago" 
            WHERE "id_cliente" = $1 AND "id" = $2
             RETURNING *`,
            [id_cliente, id_metodo]
        );
        return rows[0] ?? null
    }
}