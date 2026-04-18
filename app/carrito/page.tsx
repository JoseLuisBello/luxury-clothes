import ProductCardCart from "./Components/ProductCardCart";

export default function CarritoPage() {
  const name = 'Zapatillas Speedrock de piel y malla';
  const price = 184830000.00;
  const image = 'https://www.prada.com/content/dam/pradabkg_products/2/2EE/2EE468/3ZM0F0002/2EE468_3ZM0_F0002_F_G000_SLR.jpg/_jcr_content/renditions/cq5dam.web.hebebed.1000.1000.jpg';
  const color = 'Negro';
  const talla = '30';
  const genero = 'Tenis para hombre';

  return (
    <div className="w-full h-full p-24">
      {/* Contenedor para la bolsa */}
      <div className="flex flex-col gap-3 items-center">
        <ProductCardCart 
          name={name}
          price={price}
          image={image}
          color={color}
          talla={talla}
          genero={genero}
          id={1}
        />

      </div>

      {/* Contenedor para el resumen de compra */}
      <div>

      </div>
    </div>
  );
}