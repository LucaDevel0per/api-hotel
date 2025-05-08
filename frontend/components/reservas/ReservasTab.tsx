"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ReservaForm from "./ReservaForm";
import { api } from "../../lib/api";

interface Reserva {
  id: number;
  checkIn: string;
  checkOut: string;
  guestId: number;
  roomId: number;
  guest?: {
    name: string;
  };
  room?: {
    number: number;
  };
}

export default function ReservasTab() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReserva, setEditingReserva] = useState<Reserva | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para buscar as reservas da API
  const fetchReservas = async () => {
    try {
      setIsLoading(true);
      const data = await api.bookings.getAll();
      setReservas(data);
    } catch (error) {
      console.error('Erro:', error);
      // Dados temporários para desenvolvimento
      setReservas([
        { 
          id: 1, 
          checkIn: '2023-05-10T00:00:00.000Z', 
          checkOut: '2023-05-15T00:00:00.000Z', 
          guestId: 1, 
          roomId: 1, 
          guest: { name: 'João Silva' }, 
          room: { number: 101 }
        },
        { 
          id: 2, 
          checkIn: '2023-06-01T00:00:00.000Z', 
          checkOut: '2023-06-05T00:00:00.000Z', 
          guestId: 2, 
          roomId: 2, 
          guest: { name: 'Maria Souza' }, 
          room: { number: 102 }
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const handleOpenForm = (reserva?: Reserva) => {
    if (reserva) {
      setEditingReserva(reserva);
    } else {
      setEditingReserva(null);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingReserva(null);
  };

  const handleDeleteReserva = async (id: number) => {
    try {
      await api.bookings.delete(id);
      // Atualiza a lista
      fetchReservas();
    } catch (error) {
      console.error('Erro ao excluir:', error);
      // Para desenvolvimento, remove localmente
      setReservas(reservas.filter(r => r.id !== id));
    }
  };

  const handleSaveReserva = () => {
    // Após salvar, atualiza a lista e fecha o formulário
    fetchReservas();
    handleCloseForm();
  };

  // Formata a data para exibição
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (isFormOpen) {
    return <ReservaForm 
      reserva={editingReserva} 
      onSave={handleSaveReserva} 
      onCancel={handleCloseForm}
    />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Lista de Reservas</h2>
        <Button onClick={() => handleOpenForm()}>Adicionar Reserva</Button>
      </div>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hóspede</TableHead>
              <TableHead>Quarto</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Nenhuma reserva encontrada
                </TableCell>
              </TableRow>
            ) : (
              reservas.map((reserva) => (
                <TableRow key={reserva.id}>
                  <TableCell>{reserva.guest?.name || `Hóspede ID ${reserva.guestId}`}</TableCell>
                  <TableCell>{reserva.room?.number || `Quarto ID ${reserva.roomId}`}</TableCell>
                  <TableCell>{formatDate(reserva.checkIn)}</TableCell>
                  <TableCell>{formatDate(reserva.checkOut)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOpenForm(reserva)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteReserva(reserva.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
} 