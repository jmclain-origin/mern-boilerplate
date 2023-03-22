import supertest from 'supertest';
import app from '@server/app';
import { connectDB, clearDB, disconnectDB } from '@server/services/db.config';
import { BodyI } from '@server/api/v1/controllers/sample.controller';

describe('Test sample routes', () => {
    beforeAll(async () => {
        await connectDB();
        await clearDB();
    });
    afterEach(async () => {
        await clearDB();
    });
    afterAll(async () => {
        await disconnectDB();
    });
    test('POST - /api/v1/sample', async () => {
        const body: BodyI = { name: 'test', age: 42 };
        const response = await supertest(app).post('/api/v1/sample').send(body);
        expect(response.status).toBe(201);
    });
});
