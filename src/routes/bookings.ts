import { Router } from "express";

import roomsRouter, { getRooms } from "./rooms";
import guestsRouter, { getGuests } from "./guests";

const router = Router();

let bookings: {
  id: number;
  guestID: number;
  roomID: number;
  checkIn: string; // formato ISO: "2025-05-07"
  checkOut: string; // formato ISO: "2025-05-07"
}[] = [];

let nextId = 1;

// POST /bookings
router.post("/", (req, res) => {
  const { guestID, roomID, checkIn, checkOut } = req.body;

  if (!guestID || !roomID || !checkIn || !checkOut) {
    res.status(400).json({ message: "Campos obrigatorios" });
    return;
  }

  const guestExists = getGuests().some((guest) => guest.id === guestID);
  if (!guestExists) {
    res.status(404).json({ message: "Hóspede nçao encontrado." });
    return;
  }

  const roomExists = getRooms().some((room) => room.id === roomID);
  if (!roomExists) {
    res.status(404).json({ message: "Quarto não encontrado." });
  }

  const newBooking = {
    id: nextId++,
    guestID,
    roomID,
    checkIn,
    checkOut,
  };

  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

router.get("/", (_req, res) => {
  res.json(bookings);
});

export default router;
