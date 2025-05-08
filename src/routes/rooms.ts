import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// Criar um novo quarto
router.post("/", async (req, res) => {
  const { number, type, status } = req.body;

  if (!number || !type || !status) {
    res.status(400).json({ message: "Campos obrigatorios" });
  }

  const newRoom = await prisma.room.create({
    data: { number, type, status },
  });

  res.status(201).json(newRoom);
});

// Listar todos os quartos
router.get("/", async (req, res) => {
  const rooms = await prisma.room.findMany();
  res.json(rooms);
});

// Listar quarto por ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const room = await prisma.room.findUnique({
      where: { id },
    });
    if (!room) {
      res.status(404).json({ message: "Quarto nao encontrado." });
      return;
    }

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: "Erro interno ao tentar buscar quarto." });
  }
});

// Atualizar um quarto
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { number, type, status } = req.body;

  try {
    const updatedRoom = await prisma.room.update({
      where: { id },
      data: { number, type, status },
    });

    res.json(updatedRoom);
  } catch (err) {
    res.status(404).json({ message: "Quarto não encontrado." });
  }
});

// deletar um quarto
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.room.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "Quarto não encontrado." });
  }
});

export default router;

