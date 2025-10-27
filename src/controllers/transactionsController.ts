import { Request, Response } from "express";

class TransactionsController {
  async create(request: Request, response: Response) {
    return response.status(200).json({ message: "Hello World" });
  }
}

export { TransactionsController };
