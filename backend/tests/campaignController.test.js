// backend/tests/campaignController.test.js
import request from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';
import Campaign from '../models/campaignModel.js';

describe('Campaign Controller Tests', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
        await Campaign.deleteMany(); // Clear the campaign collection before tests
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('POST /api/campaigns', () => {
        it('should create a new campaign successfully', async () => {
            const campaignData = {
                name: 'Test Campaign',
                description: 'A test campaign for outreach automation'
            };

            const response = await request(app)
                .post('/api/campaigns')
                .send(campaignData);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Campaign created successfully!');
        });

        it('should return error when name is missing', async () => {
            const campaignData = { description: 'Incomplete data test' };
            const response = await request(app)
                .post('/api/campaigns')
                .send(campaignData);

            expect(response.status).toBe(400);
        });
    });
});
