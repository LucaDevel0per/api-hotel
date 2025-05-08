"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import QuartoForm from "./QuartoForm";
import { api } from "../../lib/api";

interface Quarto {
  id: number;
  number: number;
  type: 'SINGLE' | 'COUPLE' | 'PREMIUM';
  status: string;
}

const tipoQuartoLabel = {
  SINGLE: 'Solteiro',
  COUPLE: 'Casal',
  PREMIUM: 'Premium'
};

export default function QuartosTab() {
  const [quartos, setQuartos] = useState<Quarto[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuarto, setEditingQuarto] = useState<Quarto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para buscar os quartos da API
  const fetchQuartos = async () => {
    try {
      setIsLoading(true);
      const data = await api.rooms.getAll();
      setQuartos(data);
    } catch (error) {
      console.error('Erro:', error);
      // Dados temporários para desenvolvimento
      setQuartos([
        { id: 1, number: 101, type: 'SINGLE', status: 'DISPONÍVEL' },
        { id: 2, number: 102, type: 'COUPLE', status: 'OCUPADO' },
        { id: 3, number: 201, type: 'PREMIUM', status: 'DISPONÍVEL' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuartos();
  }, []);

  const handleOpenForm = (quarto?: Quarto) => {
    if (quarto) {
      setEditingQuarto(quarto);
    } else {
      setEditingQuarto(null);
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingQuarto(null);
  };

  const handleDeleteQuarto = async (id: number) => {
    try {
      await api.rooms.delete(id);
      // Atualiza a lista
      fetchQuartos();
    } catch (error) {
      console.error('Erro ao excluir:', error);
      // Para desenvolvimento, remove localmente
      setQuartos(quartos.filter(q => q.id !== id));
    }
  };

  const handleSaveQuarto = () => {
    // Após salvar, atualiza a lista e fecha o formulário
    fetchQuartos();
    handleCloseForm();
  };

  if (isFormOpen) {
    return <QuartoForm 
      quarto={editingQuarto} 
      onSave={handleSaveQuarto} 
      onCancel={handleCloseForm}
    />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Lista de Quartos</h2>
        <Button onClick={() => handleOpenForm()}>Adicionar Quarto</Button>
      </div>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quartos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Nenhum quarto encontrado
                </TableCell>
              </TableRow>
            ) : (
              quartos.map((quarto) => (
                <TableRow key={quarto.id}>
                  <TableCell>{quarto.number}</TableCell>
                  <TableCell>{tipoQuartoLabel[quarto.type]}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        quarto.status === 'DISPONÍVEL' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {quarto.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOpenForm(quarto)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteQuarto(quarto.id)}
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