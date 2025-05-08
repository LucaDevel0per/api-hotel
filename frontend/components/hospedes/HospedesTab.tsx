"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import HospedeForm from "./HospedeForm";
import { api } from "../../lib/api";

interface Hospede {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function HospedesTab() {
  const [hospedes, setHospedes] = useState<Hospede[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHospede, setEditingHospede] = useState<Hospede | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para buscar os hóspedes da API
  const fetchHospedes = async () => {
    try {
      setIsLoading(true);
      const data = await api.guests.getAll();
      setHospedes(data);
    } catch (error) {
      console.error('Erro:', error);
      // Dados temporários para desenvolvimento
      setHospedes([
        { id: 1, name: 'João Silva', email: 'joao@example.com', phone: '(11) 9999-8888' },
        { id: 2, name: 'Maria Souza', email: 'maria@example.com', phone: '(11) 9797-7979' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHospedes();
  }, []);

  const handleOpenForm = (hospede?: Hospede) => {
    if (hospede) {
      setEditingHospede(hospede);
    } else {
      setEditingHospede(null);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingHospede(null);
  };

  const handleDeleteHospede = async (id: number) => {
    try {
      await api.guests.delete(id);
      // Atualiza a lista
      fetchHospedes();
    } catch (error) {
      console.error('Erro ao excluir:', error);
      // Para desenvolvimento, remove localmente
      setHospedes(hospedes.filter(h => h.id !== id));
    }
  };

  const handleSaveHospede = () => {
    // Após salvar, atualiza a lista e fecha o formulário
    fetchHospedes();
    handleCloseForm();
  };

  if (isFormOpen) {
    return <HospedeForm 
      hospede={editingHospede} 
      onSave={handleSaveHospede} 
      onCancel={handleCloseForm}
    />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Lista de Hóspedes</h2>
        <Button onClick={() => handleOpenForm()}>Adicionar Hóspede</Button>
      </div>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hospedes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Nenhum hóspede encontrado
                </TableCell>
              </TableRow>
            ) : (
              hospedes.map((hospede) => (
                <TableRow key={hospede.id}>
                  <TableCell>{hospede.name}</TableCell>
                  <TableCell>{hospede.email}</TableCell>
                  <TableCell>{hospede.phone}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOpenForm(hospede)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteHospede(hospede.id)}
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