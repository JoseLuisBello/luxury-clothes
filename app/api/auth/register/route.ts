//***********/
//* Nombre del equipo: Equipo 1 */
//* Autor de la clase: Cervantes Rosales Abdiel */
//* Fecha: 06/02/2026 */
//**********/

import { NextResponse } from "next/server";
import { AuthService } from "@/services/cliente/cliente.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await AuthService.register(body);

    return NextResponse.json({
      message: "Usuario creado correctamente"
    });

  } catch (error: any) {

    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
