"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import HospedesTab from "../../components/hospedes/HospedesTab";
import QuartosTab from "../../components/quartos/QuartosTab";
import ReservasTab from "../../components/reservas/ReservasTab";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Sistema de Reservas de Hotel</h1>
      
      <Tabs defaultValue="hospedes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hospedes">Hóspedes</TabsTrigger>
          <TabsTrigger value="quartos">Quartos</TabsTrigger>
          <TabsTrigger value="reservas">Reservas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hospedes">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Hóspedes</CardTitle>
            </CardHeader>
            <CardContent>
              <HospedesTab />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quartos">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Quartos</CardTitle>
            </CardHeader>
            <CardContent>
              <QuartosTab />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reservas">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <ReservasTab />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
