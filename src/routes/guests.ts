import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// criar guest
router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({ message: "Campos obrigatorios" });
  }

  const newGuest = await prisma.guest.create({
    data: { name, email, phone },
  });

  res.status(201).json(newGuest);
});

// Listar todos os guests
router.get("/", async (req, res) => {
  const guests = await prisma.guest.findMany();
  res.json(guests);
});

// Listar guests por id
router.get("/:id", async  (req, res) => {
  const id = parseInt(req.params.id);

  try {
      const guest = await prisma.guest.findUnique({
        where: { id },
      })
      if (!guest) {
        res.status(404).json({ message: "Hospede não encontrado." });
        return;
      }

      res.json(guest);
  } catch(err) {
    res.status(500).json({ message: "Erro interno ao tentar buscar hóspede."})
  }


});

// Atualizar um guest
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone } = req.body;

  try {
    const updatedGuest = await prisma.guest.update({
      where: { id },
      data: { name, email, phone },
    });

    res.json(updatedGuest);
  } catch (err) {
    res.status(404).json({ message: "Hóspede não encontrado." });
  }
});

// deletar um quarto

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.guest.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "Hóspede não encontrado." });
  }
});

export default router;
