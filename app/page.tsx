import { getCatalogo } from "@/client/producto.client";
import Carousel from "@/components/Carousel";

export default async function Home() {
  const productos = await getCatalogo({});

  return (
    <>
      <Carousel slides={productos.productos?.slice(0,3)} />
    </>
  )
}
