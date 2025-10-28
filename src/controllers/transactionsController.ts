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

    const transaction = await prisma.transaction.create({
      data: {
        description,
        price,
        category,
        type,
      },
    });

    return response.status(201).json(transaction);
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

  async summary(request: Request, response: Response) {
    const [incomeAgg, outcomeAgg] = await Promise.all([
      prisma.transaction.aggregate({
        where: { type: "INCOME" },
        _sum: { price: true },
      }),
      prisma.transaction.aggregate({
        where: { type: "OUTCOME" },
        _sum: { price: true },
      }),
    ]);

    const income = incomeAgg._sum.price ?? 0;
    const outcome = outcomeAgg._sum.price ?? 0;
    const total = income - outcome;

    return response.json({ income, outcome, total });
  }
}

export { TransactionsController };
