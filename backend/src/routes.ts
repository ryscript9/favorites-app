import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { entrySchema } from "./validators";

const router = Router();
const prisma = new PrismaClient();

router.get("/entries", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = 10;

  const search = req.query.search as string | undefined;
  const type = req.query.type as string | undefined;

  const where = {
    ...(search && {
      title: {
        contains: search,
      },
    }),
    ...(type && { type }),
  };

  const [entries, totalItems] = await Promise.all([
    prisma.entry.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.entry.count({ where }),
  ]);

  const totalPages = Math.ceil(totalItems / pageSize);

  res.json({
    data: entries,
    meta: {
      page,
      pageSize,
      totalItems,
      totalPages,
    },
  });
});

router.post("/entries", async (req: Request, res: Response) => {
  const parsed = entrySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }

  const entry = await prisma.entry.create({
    data: parsed.data,
  });

  res.json(entry);
});

router.put("/entries/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const parsed = entrySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }

  const entry = await prisma.entry.update({
    where: { id },
    data: parsed.data,
  });

  res.json(entry);
});

router.delete("/entries/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.entry.delete({
    where: { id },
  });

  res.json({ success: true });
});

export default router;
