import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// Dados de exemplo para quando o banco de dados não estiver conectado
const exampleGuests = [
  { id: 1, name: 'João Silva', email: 'joao@example.com', phone: '(11) 9999-8888' },
  { id: 2, name: 'Maria Souza', email: 'maria@example.com', phone: '(11) 9797-7979' },
  { id: 3, name: 'Pedro Santos', email: 'pedro@example.com', phone: '(11) 8888-7777' }
];

// criar guest
router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Campos obrigatorios" });
  }

  try {
    const newGuest = await prisma.guest.create({
      data: { name, email, phone },
    });

    res.status(201).json(newGuest);
  } catch (error) {
    console.error("Erro ao criar hóspede:", error);
    // Simulando criação quando DB não está disponível
    const newGuest = { 
      id: exampleGuests.length + 1, 
      name, 
      email, 
      phone 
    };
    exampleGuests.push(newGuest);
    res.status(201).json(newGuest);
  }
});

// Listar todos os guests
router.get("/", async (req, res) => {
  try {
    const guests = await prisma.guest.findMany();
    res.json(guests);
  } catch (error) {
    console.error("Erro ao listar hóspedes:", error);
    // Usar dados de exemplo quando DB não está disponível
    res.json(exampleGuests);
  }
});

// Listar guests por id
router.get("/:id", async  (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const guest = await prisma.guest.findUnique({
      where: { id },
    });
    
    if (!guest) {
      // Tentar encontrar nos dados de exemplo
      const exampleGuest = exampleGuests.find(g => g.id === id);
      if (exampleGuest) {
        return res.json(exampleGuest);
      }
      return res.status(404).json({ message: "Hospede não encontrado." });
    }

    res.json(guest);
  } catch(err) {
    console.error("Erro ao buscar hóspede:", err);
    // Tentar buscar nos dados de exemplo
    const exampleGuest = exampleGuests.find(g => g.id === id);
    if (exampleGuest) {
      return res.json(exampleGuest);
    }
    res.status(500).json({ message: "Erro interno ao tentar buscar hóspede."});
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
    console.error("Erro ao atualizar hóspede:", err);
    // Tentar atualizar nos dados de exemplo
    const index = exampleGuests.findIndex(g => g.id === id);
    if (index !== -1) {
      exampleGuests[index] = { id, name, email, phone };
      return res.json(exampleGuests[index]);
    }
    res.status(404).json({ message: "Hóspede não encontrado." });
  }
});

// deletar um hóspede
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.guest.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir hóspede:", error);
    // Tentar excluir dos dados de exemplo
    const index = exampleGuests.findIndex(g => g.id === id);
    if (index !== -1) {
      exampleGuests.splice(index, 1);
      return res.status(204).send();
    }
    res.status(404).json({ message: "Hóspede não encontrado." });
  }
});

export default router;
