import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import request from 'supertest';
import app from '../index.js'; 

dotenv.config();

// Test Token
describe('Token Generation', () => {
  it('should generate a token with the correct user details and expiration', () => {
    const userId = '123456';
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.userId).toBe(userId);
    expect(decoded.exp).toBeGreaterThan(decoded.iat);
  });
});




describe('Auth API', () => {
  it('should register user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'maureen',
        lastName: 'attah',
        email: 'bisi@example.com',
        password: 'password',
        phone: '1234567890'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data.user.email', 'bisi@example.com');
  });

  it('should login user successfully', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'bisi@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data.user.email', 'bisi@example.com');
  });

  it('should fail if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('errors');
  });

  it('should fail if there’s duplicate email', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'maureen',
        lastName: 'attah',
        email: 'bisi@example.com',
        password: 'password',
        phone: '1234567890'
      });

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        firstName: 'maureen',
        lastName: 'attah',
        email: 'bisi@example.com',
        password: 'password',
        phone: '0987654321'
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('errors');
  });
});