import { Request, Response } from 'express';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

import { container } from 'tsyringe';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email } = request.body;
      console.log(name, email);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
