import { Producto as ProductoService } from '@/services/producto/producto.service';
import { pool } from '@/lib/db';

jest.mock('@/lib/db', () => ({
  pool: {
    query: jest.fn()
  }
}));

describe('Producto Repository & Service', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Obtener catalogo -> getCatalog', () => {

    it('debe retornar productos sin filtros', async () => {

      const mockProducts = [
        { id: 1, nombre: 'Camisa', precio: 500, marca: 'Nike', imagen_url: 'img1.jpg' },
        { id: 2, nombre: 'Pantalón', precio: 800, marca: 'Adidas', imagen_url: 'img2.jpg' }
      ];

      (pool.query as jest.Mock).mockResolvedValue({
        rows: mockProducts
      });

      const result = await ProductoService.getCatalog({});

      expect(pool.query).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
      expect(result.length).toBe(2);

    });

  });

  describe('Obtener detalles de producto -> getProductDetails', () => {

    it('debe retornar detalles de un producto', async () => {

      const mockProduct = {
        id: 1,
        nombre: 'Camisa Negra',
        descripcion: 'Camisa oversize',
        precio: 700,
        color: 'Negro',
        marca: 'Nike',
        imagenes: ['img1.jpg', 'img2.jpg'],
        stock_por_talla: [
          { talla: 'S', stock: 10 },
          { talla: 'M', stock: 5 }
        ]
      };

      (pool.query as jest.Mock).mockResolvedValue({
        rows: [mockProduct]
      });

      const result = await ProductoService.getProductDetails(1);

      expect(pool.query).toHaveBeenCalledWith(
        expect.any(String),
        [1]
      );

      expect(result).toEqual(mockProduct);
      expect(result.nombre).toBe('Camisa Negra');

    });

  });

});