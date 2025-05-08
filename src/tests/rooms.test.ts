import request from 'supertest';
import app from '../app';

describe('Rooms API', () => {
  it('deve criar um novo quarto', async () => {
    const response = await request(app).post('/rooms').send({
      number: 101,
      type: 'SINGLE',
      status: 'available',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.number).toBe(101);

    
  });

  it('deve listar todos os quartos', async () => {
    const response = await request(app).get('/rooms');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('deve buscar um quarto por ID', async () => {
    const newRoom = await request(app).post('/rooms').send({
      number: 102,
      type: 'COUPLE',
      status: 'available',
    });

    const response = await request(app).get(`/rooms/${newRoom.body.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.number).toBe(102);

  });

  

});
