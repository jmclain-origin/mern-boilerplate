import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '@server/services/db.config';

describe('Test mongoose jest connection', () => {
    beforeAll(async () => {
        await connectDB();
    });
    afterAll(async () => {
        await disconnectDB();
    });
    it('should have a database connection', async () => {
        expect(mongoose.connection).toBeTruthy();
    });
});
