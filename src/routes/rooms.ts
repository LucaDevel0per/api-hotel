import { Router } from "express";

const router = Router();

// bd em memoria
let rooms: { id: number; number: string; type: string; available: boolean }[] =
  [];
let nextId = 1;

// Criar um novo quarto
router.post("/", (req, res) => {
  const { number, type, available } = req.body;

  if (!number || !type || available === undefined) {
    res.status(400).json({ message: "Campos obrigátorios" });
    return;
  }

  const newRoom = {
    id: nextId++,
    number,
    type,
    available,
  };

  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

// Listar todos os quartos
router.get("/", (_req, res) => {
  res.json(rooms);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const room = rooms.find((r) => r.id === id);

  if (!room) {
    res.status(404).json({ message: "Quarto não enontrado." });
    return;
  }

  res.json(room);
});

// Atualizar um quarto
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { number, type, available } = req.body;

  const roomIndex = rooms.findIndex((r) => r.id === id);
  if (roomIndex === -1) {
    res.status(404).json({ message: "Quarto não encontrado" });
    return;
  }

  rooms[roomIndex] = {
    ...rooms[roomIndex],
    number,
    type,
    available,
  };

  res.json(rooms[roomIndex]);
});

// deletar um quarto

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  rooms = rooms.filter((r) => r.id !== id);
  res.status(204).send();
});

export default router;
export const getRooms = () => rooms;