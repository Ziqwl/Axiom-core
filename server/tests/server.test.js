const request = require('supertest');
const express = require('express');
const app = require('../src/index');

// Since we're not actually starting the server in tests, we need to export the app
// Let's modify the server code to support testing

describe('Axiom Server API', () => {
  test('should respond to health check', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  test('should create a new design', async () => {
    const newDesign = {
      name: 'Test Design',
      components: [
        { type: 'server', x: 100, y: 100 },
        { type: 'database', x: 200, y: 200 }
      ]
    };

    const response = await request(app)
      .post('/api/designs')
      .send(newDesign)
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newDesign.name);
    expect(response.body.components).toEqual(newDesign.components);
  });

  test('should retrieve designs', async () => {
    const response = await request(app).get('/api/designs');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});