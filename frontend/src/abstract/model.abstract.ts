/* eslint-disable @typescript-eslint/no-explicit-any */
export default abstract class ProductModelAPI {
    abstract getById(id: string): Promise<any>;
    abstract getAll(): Promise<any>;
    abstract create(product: any): Promise<any>;
    abstract update(id: string, product: any): Promise<any>;
    abstract delete(id: string): Promise<any>;
}
