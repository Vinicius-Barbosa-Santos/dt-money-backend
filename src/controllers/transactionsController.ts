import { Request, Response } from "express";

import z from "zod";

class TransactionsController {
  async create(request: Request, response: Response) {
    return response.json({
      message: "Transaction created",
    });
  }
}

export { TransactionsController };
