import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) { }

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    //VERIFICO SE O COMPRADOR EXISTE
    const customer = await this.customersRepository.findById(customer_id);
    if (!customer) {
      throw new AppError('Customer not found');
    }

    //SEPARO OS IDS DOS PRODUTOS
    const productIds = products.map(product => ({
      id: product.id,
    }));

    //VERIFICO SE TODOS OS PRODUTOS DA ORDER EXISTEM
    const findProducts = await this.productsRepository.findAllById(productIds);
    if (!findProducts || products.length !== findProducts.length) {
      throw new AppError('Some product not found');
    }

    let updatedProducts: IUpdateProductsQuantityDTO[] = [];

    //FORMATO OS PRODUTOS DE ACORDO COM O ESPERADO NA INTERFACE
    const parsedProducts = findProducts.map(findProduct => {
      const findProductById = products.find(product => product.id === findProduct.id);

      //VERIFICO SE O PRODUTO POSSUI ESTOQUE DISPONIVEL
      if (findProductById && findProductById.quantity > findProduct.quantity) {
        throw new AppError('Product not available');
      }

      if (findProductById) {
        updatedProducts.push({
          id: findProductById.id,
          quantity: findProductById.quantity
        })
      }

      return {
        product_id: findProduct.id,
        price: findProduct.price,
        quantity: findProductById?.quantity || 0,
      };
    });


    const createOrder = await this.ordersRepository.create({
      customer,
      products: parsedProducts,
    });

    await this.productsRepository.updateQuantity(updatedProducts);

    return createOrder;
  }
}

export default CreateOrderService;
