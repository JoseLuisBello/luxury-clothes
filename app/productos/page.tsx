import { getCatalogo } from "@/client/producto.client";
import Link from "next/dist/client/link";
import Image from "next/image";
export default async function Productos() {

  // const response = await getCatalogo({id_categoria: 1});
  // const productos = response.productos; // por como regresas los datos en tu api

  return (
    // div principal
    <div className="flex flex-col justify-center items-start">
      {/* breadcrumb */}
      <div className="flex items-center justify-start border space-x-2 w-fit">
        <div className="hover:underline w-fit">
          <Link
            href={"#"}
          >Ropa</Link>
        </div>
        <span>/</span>
        <div className="hover:underline w-fit">
          <Link href={"#"}>Hombre</Link>
        </div>
        <span>/</span>
        <div className="hover:underline w-fit">
          <Link href={"#"}>Chamarra</Link>
        </div>
      </div>

      {/* titulo y apartado de filtro */}
    </div>
  );
}
