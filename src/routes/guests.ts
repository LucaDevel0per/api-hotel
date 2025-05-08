import { Router } from "express";

const router = Router();

let guests: { id: number; name: string; email: string; phone: string }[] = [];
let nextId = 1;

// Criar novo guest
router.post('/', (req, res) => {
    const { name, email, phone} = req.body;

    if (!name || !email || !phone) {
        res.status(400).json({ message: "Campos obrigatórios: name, email, phone" });
        return
    }

    const newGuest = {
        id: nextId++,
        name,
        email,
        phone
    };

    guests.push(newGuest);
    res.status(201).json(newGuest);
})

// Listar guests
router.get('/', (req, res) => {
    res.json(guests);
})

// Listar guests por id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const guest = guests.find((g) => g.id === id);

    if(!guest) {
        res.status(404).json({ message: "Hospede não encontrado."});
        return;
    }

    res.json(guest);
});

// Atualizar um guest
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, phone } = req.body;

    const guestIndex = guests.findIndex((g) => g.id === id);
    if (guestIndex === -1) {
        res.status(404).json({ message: "Hospede não encontrado."})
        return;
    }

    guests[guestIndex] = {
        ...guests[guestIndex],
        name,
        email,
        phone
    };

    res.json(guests[guestIndex]);
});

// deletar um quarto

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    guests = guests.filter((g) => g.id !== id);
    res.status(204).send();
})


export default router;
export const getGuests = () => guests;
