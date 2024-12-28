const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const todos = require('../routes/todos');

describe('Todo list', () => {
    const app = express();
    app.use('/', todos);
  
    it('should respond all todos', async () => {
        const mockTodos = [
            { id: 1, task: 'Test Task 1', status: 'pending', created_at: '2024-01-01' },
            { id: 2, task: 'Test Task 2', status: 'pending', created_at: '2024-01-02' },
        ];
      const response = await request(app).get('/todos');
      expect(response.status).to.equal(200);
      expect(response.body).to.equal(mockTodos);
    });
  });