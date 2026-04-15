import Link from "next/link";
import { breadCrumbs } from "../utils/producto";

export default function BreadCrumb({ categoria, subcategoria, genero }: { categoria: number; subcategoria?: number; genero?: number }) {

    const crumbs = breadCrumbs({
        id_categoria: categoria,
        id_subcategoria: subcategoria,
        id_genero: genero
    });

    return (
        <div className="flex items-center justify-start space-x-2 w-fit mt-3 mb-10 text-md font-light">
            {
                crumbs.categoria && (
                    <div className="hover:underline w-fit">
                        <Link href={"#"}>{crumbs.categoria}</Link>
                    </div>
                )
            }

            {
                crumbs.subcategoria && (
                    <>
                        <span>/</span>
                        <div className="hover:underline w-fit">
                            <Link href={"#"}>{crumbs.subcategoria}</Link>
                        </div>
                    </>
                )
            }
            {
                crumbs.genero && (
                    <>
                        <span>/</span>
                        <div className="hover:underline w-fit">
                            <Link href={"#"}>{crumbs.genero}</Link>
                        </div>
                    </>
                )
            }
        </div>
    );
}