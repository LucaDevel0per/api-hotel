import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.post("/", async (req, res) => {
  const { guestId, roomId, checkIn, checkOut } = req.body;

  if (!guestId || !roomId || !checkIn) {
    res
      .status(400)
      .json({ message: "Campos obrigatórios: guestId, roomId, checkIn" });
    return;
  }

  try {
    const booking = await prisma.booking.create({
      data: {
        guestId,
        roomId,
        checkIn: new Date(checkIn),
        checkOut: checkOut ? new Date(checkOut) : new Date(checkIn),
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar reserva" });
  }
});

// Listar todas as reservas
router.get("/", async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        guest: true,
        room: true,
      },
    });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar reservas" });
  }
});

// Buscar uma reserva por ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        guest: true,
        room: true,
      },
    });

    if (!booking) {
      res.status(404).json({ message: "Reserva não encontrada" });
      return;
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar reserva" });
  }
});

// Atualizar uma reserva
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { guestId, roomId, checkIn, checkOut } = req.body;

  if (!guestId || !roomId || !checkIn) {
    res
      .status(400)
      .json({ message: "Campos obrigatórios: guestId, roomId, checkIn" });
    return;
  }

  try {
    // Verifica se a reserva existe
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      res.status(404).json({ message: "Reserva não encontrada" });
      return;
    }

    // Verifica se o hóspede existe
    const guest = await prisma.guest.findUnique({ where: { id: guestId } });
    if (!guest) {
      res.status(404).json({ message: "Hóspede não encontrado" });
      return;
    }

    // Verifica se o quarto existe
    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) {
      res.status(404).json({ message: "Quarto não encontrado" });
      return;
    }

    // Atualiza a reserva
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        guestId,
        roomId,
        checkIn: new Date(checkIn),
        checkOut: checkOut ? new Date(checkOut) : undefined,
      },
    });

    res.json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar reserva" });
  }
});

// Deletar uma reserva
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    // Verifica se a reserva existe
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      res.status(404).json({ message: "Reserva não encontrada" });
      return;
    }

    // Deleta a reserva
    await prisma.booking.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar reserva" });
  }
});

export default router;
