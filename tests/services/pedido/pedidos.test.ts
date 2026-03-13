//***********/
//* Nombre del equipo: Equipo 1 */
//* Autor de la clase: Ramos Bello Jose Luis */
//* Fecha: 25/02/2026 */
//**********/
import { PedidoService } from "@/services/pedido/pedido.service";
import { PedidoRepository } from "@/repositories/pedido/pedido.repository";

jest.mock("@/repositories/pedido/pedido.repository", () => ({
    PedidoRepository: {
        cancelarPedido: jest.fn(),
        estadoPedido: jest.fn(),
        getDetallePedido: jest.fn(),
        obtenerHistorialCliente: jest.fn(),
        procesarCompra: jest.fn(),
        crearPedidoDesdeCarrito: jest.fn(),
    },
}));

describe("PedidoService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    //************************************/
    // Cancelaion de pedido
    //************************************/

    describe("Cancelar pedido", () => {
        test("cancela pedido correctamente cuando está permitido", async () => {
            (PedidoRepository.cancelarPedido as jest.Mock).mockResolvedValue({
                rowCount: 1,
                rows: [{ id: 25, estado: "cancelado" }],
            });

            const result = await PedidoService.cancelarPedido(25);

            expect(result).toMatchObject({
                mensaje: "Pedido cancelado correctamente",
                pedidoId: 25,
                nuevoEstado: "cancelado",
            });
            expect(PedidoRepository.cancelarPedido).toHaveBeenCalledWith(25);
        });

        test("lanza error si el pedido no puede ser cancelado o no existe", async () => {
            (PedidoRepository.cancelarPedido as jest.Mock).mockResolvedValue({
                rowCount: 0,
                rows: [],
            });

            await expect(PedidoService.cancelarPedido(999)).rejects.toThrow(
                "El pedido no existe o no se puede cancelar en su estado actual"
            );
        });
    });

    //************************************/
    // Estado de pedido
    //************************************/

    describe("Estado de pedido", () => {
        test("retorna el estado del pedido cuando existe", async () => {
            const mockPedido = {
                id: 30,
                estado: "en proceso",
                fecha_pedido: "2026-02-20",
            };

            (PedidoRepository.estadoPedido as jest.Mock).mockResolvedValue({
                rowCount: 1,
                rows: [mockPedido],
            });

            const result = await PedidoService.obtenerEstadoPedido(30);

            expect(result).toEqual(mockPedido);
            expect(PedidoRepository.estadoPedido).toHaveBeenCalledWith(30);
        });

        test("lanza error si el pedido no existe", async () => {
            (PedidoRepository.estadoPedido as jest.Mock).mockResolvedValue({
                rowCount: 0,
                rows: [],
            });

            await expect(PedidoService.obtenerEstadoPedido(999)).rejects.toThrow(
                "Pedido no encontrado"
            );
        });
    });


    //************************************/
    // Proceso de compra de pedido
    //************************************/

    describe("Proceso de compra de pedido", () => {
        test("crea pedido correctamente con carrito válido", async () => {
            (PedidoRepository.crearPedidoDesdeCarrito as jest.Mock).mockResolvedValue({
                rowCount: 1,
                rows: [{
                    id: 100,
                    id_cliente: 5,
                    total: 1500,
                    estado: "pendiente"
                }],
            });

            const resultado = await PedidoService.procesarCompra(5, 1, 2, "Sin notas");

            expect(resultado).toMatchObject({
                id: 100,
                total: 1500,
                estado: "pendiente"
            });
            expect(PedidoRepository.crearPedidoDesdeCarrito).toHaveBeenCalledWith(5, 1, 2, "Sin notas");
        });

        test("envia error si carrito vacío", async () => {
            (PedidoRepository.crearPedidoDesdeCarrito as jest.Mock).mockRejectedValue(
                new Error("El carrito está vacío o no tiene productos válidos")
            );

            await expect(
                PedidoService.procesarCompra(5, 1, 2)
            ).rejects.toThrow("El carrito está vacío o no tiene productos válidos");
        });
    });

    //***********/
    //* Nombre del equipo: Equipo 1 */
    //* Autor de la clase: Cervantes Rosales Abdiel */
    //* Fecha: 26/02/2026 */
    //**********/


    //************************************/
    // Detalle de pedido
    //************************************/

    describe("getDetalle", () => {

        test("retorna el detalle del pedido cuando existe", async () => {

            const mockDetalle = [
                {
                    pedido_id: 1,
                    nombre: "Camisa Nike",
                    cantidad: 1,
                    precio_unitario: 299.99,
                },
            ];

            (PedidoRepository.getDetallePedido as jest.Mock).mockResolvedValue({
                rows: mockDetalle,
            });

            const result = await PedidoService.getDetalle(1);

            expect(result).toEqual(mockDetalle);
            expect(PedidoRepository.getDetallePedido).toHaveBeenCalledWith(1);
        });

        test("lanza error cuando el pedido no existe", async () => {

            (PedidoRepository.getDetallePedido as jest.Mock).mockResolvedValue({
                rows: [],
            });

            await expect(
                PedidoService.getDetalle(999)
            ).rejects.toThrow("Pedido no encontrado");
        });
    });

    //************************************/
    // Historial pedidos cliente
    //************************************/

    describe("obtenerHistorialCliente", () => {

        test("retorna historial cuando el cliente tiene pedidos", async () => {

            const mockHistorial = [
                {
                    id_pedido: 1,
                    fecha: "2026-02-25",
                    total: 299.99,
                    nombre: "Camisa Nike",
                    cantidad: 1,
                    precio_unitario: 299.99,
                },
            ];

            (PedidoRepository.obtenerHistorialCliente as jest.Mock).mockResolvedValue(
                mockHistorial
            );

            const result = await PedidoService.obtenerHistorialCliente(1);

            expect(result).toEqual(mockHistorial);
            expect(PedidoRepository.obtenerHistorialCliente).toHaveBeenCalledWith(1);
        });

        test("retorna arreglo vacío si no hay pedidos", async () => {

            (PedidoRepository.obtenerHistorialCliente as jest.Mock).mockResolvedValue(
                []
            );

            const result = await PedidoService.obtenerHistorialCliente(50);

            expect(result).toEqual([]);
        });
    });

    //************************************/
    // Obtener comprobante
    //************************************/

    describe("obtenerComprobante", () => {

        test("genera comprobante con datos del pedido", async () => {

            const mockDetalle = [
                {
                    pedido_id: 1,
                    nombre: "Camisa Nike",
                    cantidad: 1,
                    precio_unitario: 299.99,
                },
            ];

            (PedidoRepository.getDetallePedido as jest.Mock).mockResolvedValue({
                rows: mockDetalle,
            });

            const result = await PedidoService.getDetalle(1);

            expect(result.length).toBeGreaterThan(0);
            expect(result[0]).toHaveProperty("nombre");
        });
    });
});