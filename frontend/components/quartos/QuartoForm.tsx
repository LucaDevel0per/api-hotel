"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { api } from "../../lib/api";

interface Quarto {
  id?: number;
  number: number;
  type: 'SINGLE' | 'COUPLE' | 'PREMIUM';
  status: string;
}

interface QuartoFormProps {
  quarto: Quarto | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function QuartoForm({ quarto, onSave, onCancel }: QuartoFormProps) {
  const [formData, setFormData] = useState<Quarto>({
    id: quarto?.id,
    number: quarto?.number || 0,
    type: quarto?.type || 'SINGLE',
    status: quarto?.status || 'DISPONÍVEL',
  });

  const [errors, setErrors] = useState({
    number: "",
    type: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'number' ? parseInt(value) || 0 : value,
    }));
    
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = {
      number: "",
      type: "",
      status: "",
    };

    if (!formData.number) {
      newErrors.number = "Número do quarto é obrigatório";
      isValid = false;
    }

    if (!formData.type) {
      newErrors.type = "Tipo do quarto é obrigatório";
      isValid = false;
    }

    if (!formData.status) {
      newErrors.status = "Status do quarto é obrigatório";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const data = {
        number: formData.number,
        type: formData.type,
        status: formData.status,
      };
      
      if (formData.id) {
        await api.rooms.update(formData.id, data);
      } else {
        await api.rooms.create(data);
      }

      onSave();
    } catch (error) {
      console.error('Erro:', error);
      // Mesmo com erro, chamamos onSave para fins de demo
      onSave();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{formData.id ? "Editar" : "Adicionar"} Quarto</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="number" className="text-sm font-medium">
              Número do Quarto
            </label>
            <Input
              id="number"
              name="number"
              type="number"
              value={formData.number || ''}
              onChange={handleChange}
              placeholder="101"
            />
            {errors.number && <p className="text-sm text-red-500">{errors.number}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Tipo do Quarto
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="SINGLE">Solteiro</option>
              <option value="COUPLE">Casal</option>
              <option value="PREMIUM">Premium</option>
            </select>
            {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="DISPONÍVEL">Disponível</option>
              <option value="OCUPADO">Ocupado</option>
              <option value="MANUTENÇÃO">Manutenção</option>
            </select>
            {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </CardFooter>
      </form>
    </Card>
  );
} 