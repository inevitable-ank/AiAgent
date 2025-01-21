// backend/tests/leadController.test.js
import request from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';
import Lead from '../models/leadModel.js';

describe('Lead Controller Tests', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
        await Lead.deleteMany(); // Clear the database before tests
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('POST /api/leads/upload', () => {
        it('should upload a lead successfully', async () => {
            const leadData = {
                name: 'John Doe',
                email: 'john@example.com',
                linkedinUrl: 'https://linkedin.com/in/johndoe'
            };

            const response = await request(app)
                .post('/api/leads/upload')
                .send(leadData);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Lead added successfully!');
        });

        it('should return error if required fields are missing', async () => {
            const response = await request(app)
                .post('/api/leads/upload')
                .send({});

            expect(response.status).toBe(400);
        });
    });
});
