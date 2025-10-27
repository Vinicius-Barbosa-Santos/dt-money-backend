import { prisma } from "@/database/prisma";
import { Request, Response } from "express";
import z from "zod";

class TransactionsController {
  async create(request: Request, response: Response) {
    const createTransactionBodySchema = z.object({
      description: z.string(),
      price: z.number(),
      category: z.string(),
      type: z.preprocess(
        (val) =>
          typeof val === "string" ? (val as string).toUpperCase() : val,
        z.enum(["INCOME", "OUTCOME"])
      ),
    });

    const { description, price, category, type } =
      createTransactionBodySchema.parse(request.body);

    await prisma.transaction.create({
      data: {
        description,
        price,
        category,
        type,
      },
    });

    return response.json();
  }

  async index(request: Request, response: Response) {
    const querySchema = z.object({
      query: z.string().optional(),
    });

    const { query } = querySchema.parse(request.query);

    const transactions = await prisma.transaction.findMany({
      where: {
        description: {
          contains: query,
        },
      },
    });

    return response.json(transactions);
  }
}

export { TransactionsController };
