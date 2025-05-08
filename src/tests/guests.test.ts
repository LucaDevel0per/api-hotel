import request from "supertest";
import app from "../app";

describe("Guests API", () => {
  it("deve criar um novo hóspede", async () => {
    const response = await request(app).post("/guests").send({
      name: "Camila",
      email: "camila@gmail.com",
      phone: "1112345678",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Camila");
  });

  it("deve listar todos os hóspedes", async () => {
    const response = await request(app).get("/guests");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("deve atualizar um hóspede", async () => {
    const createResponse = await request(app).post("/guests").send({
      name: "Luca",
      email: "luca@gmail.com",
      phone: "11962858259",
    });

    const updatedGuest = await request(app)
      .put(`/guests/${createResponse.body.id}`)
      .send({
        name: "Teste Atualizado",
        email: "testeAtualizado@gmail.com",
        phone: "987654321",
      });
    expect(updatedGuest.statusCode).toBe(200);
    expect(updatedGuest.body.name).toBe("Teste Atualizado");
    expect(updatedGuest.body.email).toBe("testeAtualizado@gmail.com");
  });

  it("deve deletar um hóspede", async () => {
    // Criação de um hóspede para ser deletado
    const createResponse = await request(app).post("/guests").send({
      name: "Luca",
      email: "luca@email.com",
      phone: "11962858259",
    });

    // Deletando o hóspede criado
    const deleteResponse = await request(app).delete(
      `/guests/${createResponse.body.id}`
    );

    expect(deleteResponse.statusCode).toBe(204); // Código de sucesso para delete sem conteúdo

    // Verificando se o hóspede foi realmente deletado
    const checkDeletedResponse = await request(app).get(
      `/guests/${createResponse.body.id}`
    );
    expect(checkDeletedResponse.statusCode).toBe(404); // Se o hóspede foi deletado, deve retornar 404
  });
});
