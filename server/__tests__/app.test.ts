import supertest from 'supertest';
import app from '@server/app';

describe('Test if app is functional', () => {
    it('should export the app', () => {
        expect(app).toBeTruthy();
    });
    it('should respond from GET request', async () => {
        const response = await supertest(app).get('/test');
        expect(response.statusCode).toBe(200);
    });
});
