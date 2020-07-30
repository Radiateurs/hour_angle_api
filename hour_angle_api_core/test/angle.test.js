/* global describe test expect */
/* Self explanatory tests on angle.controller. GET and POST testing */
import request from 'supertest';

const app = request.agent(global.angleRouter);
const errorMissingArg = 'Missing parameters \'h\' or \'m\' in the query.';
const errorCaughtCalc = 'Caught an error calculating the angle.';
const errorWrongArgs = 'Wrong values in the query request. \'h\' must be a number between 0 and 23. \'m\' must be a number between 0 and 59.';

describe('Angle GET controller tests', () => {
    test('GET angle empty query', async done => {
        const result = await app.get('/angle');
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty('error', errorMissingArg);
        done();
    });
    test('GET angle query missing h', async done => {
        const result = await app.get('/angle?m=30');
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty('error', errorMissingArg);
        done();
    });
    test('GET angle query missing m', async done => {
        const result = await app.get('/angle?h=4');
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty('error', errorMissingArg);
        done();
    });
    test('GET angle query h too high', async done => {
        const result = await app.get('/angle?h=40&m=30');
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty('error', errorCaughtCalc);
        expect(result.body).toHaveProperty('stack');
        expect(result.body.stack).toHaveProperty('error', errorWrongArgs);
        done();
    });
    test('GET angle query h too low', async done => {
        const result = await app.get('/angle?h=-5&m=30');
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty('error', errorCaughtCalc);
        expect(result.body).toHaveProperty('stack');
        expect(result.body.stack).toHaveProperty('error', errorWrongArgs);
        done();
    });
    test('GET angle query m too high', async done => {
        const result = await app.get('/angle?h=5&m=600');
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty('error', errorCaughtCalc);
        expect(result.body).toHaveProperty('stack');
        expect(result.body.stack).toHaveProperty('error', errorWrongArgs);
        done();
    });
    test('GET angle query m too low', async done => {
        const result = await app.get('/angle?h=5&m=-600');
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty('error', errorCaughtCalc);
        expect(result.body).toHaveProperty('stack');
        expect(result.body.stack).toHaveProperty('error', errorWrongArgs);
        done();
    });
    test('GET angle 5:00 = 150', async done => {
        const result = await app.get('/angle?h=5&m=0');
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('result', 150);
        done();
    });
    test('GET angle 4:00 = 120', async done => {
        const result = await app.get('/angle?h=4&m=0');
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('result', 120);
        done();
    });
    test('GET angle 16:00 = 120', async done => {
        const result = await app.get('/angle?h=16&m=0');
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('result', 120);
        done();
    });
    test('GET angle 0:00 = 0', async done => {
        const result = await app.get('/angle?h=0&m=0');
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('result', 0);
        done();
    });
    test('GET angle 3:47 = 168.5', async done => {
        const result = await app.get('/angle?h=3&m=47');
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('result', 168.5);
        done();
    });
});

describe('Angle POST controller tests', () => {
    test('POST angle empty query', async done => {
        const obj = {};
        const result = await app.post('/angle').send(obj);
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty('error', errorMissingArg);
        done();
    });
    test('POST angle query missing h', async done => {
        const obj = { h: 0 };
        const result = await app.post('/angle').send(obj);
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty('error', errorMissingArg);
        done();
    });
    test('POST angle query missing m', async done => {
        const obj = { m: 0 };
        const result = await app.post('/angle').send(obj);
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty('error', errorMissingArg);
        done();
    });
    test('POST angle query h too high', async done => {
        const obj = { h: 25, m: 0 };
        const result = await app.post('/angle').send(obj);
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty('error', errorCaughtCalc);
        expect(result.body).toHaveProperty('stack');
        expect(result.body.stack).toHaveProperty('error', errorWrongArgs);
        done();
    });
    test('POST angle query h too low', async done => {
        const obj = { h: -3, m: 0 };
        const result = await app.post('/angle').send(obj);
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty('error', errorCaughtCalc);
        expect(result.body).toHaveProperty('stack');
        expect(result.body.stack).toHaveProperty('error', errorWrongArgs);
        done();
    });
    test('POST angle query m too high', async done => {
        const obj = { h: 0, m: 600 };
        const result = await app.post('/angle').send(obj);
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty('error', errorCaughtCalc);
        expect(result.body).toHaveProperty('stack');
        expect(result.body.stack).toHaveProperty('error', errorWrongArgs);
        done();
    });
    test('POST angle query m too low', async done => {
        const obj = { h: 0, m: -30 };
        const result = await app.post('/angle').send(obj);
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty('error', errorCaughtCalc);
        expect(result.body).toHaveProperty('stack');
        expect(result.body.stack).toHaveProperty('error', errorWrongArgs);
        done();
    });
    test('POST angle 5:00 = 150', async done => {
        const obj = { h: 5, m: 0 };
        const result = await app.post('/angle').send(obj);
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('result', 150);
        done();
    });
    test('POST angle 4:00 = 120', async done => {
        const obj = { h: 4, m: 0 };
        const result = await app.post('/angle').send(obj);
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('result', 120);
        done();
    });
    test('POST angle 16:00 = 120', async done => {
        const obj = { h: 16, m: 0 };
        const result = await app.post('/angle').send(obj);
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('result', 120);
        done();
    });
    test('POST angle 0:00 = 0', async done => {
        const obj = { h: 0, m: 0 };
        const result = await app.post('/angle?h=3&m=47').send(obj);
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('result', 0);
        done();
    });
    test('POST angle 3:47 = 168.5', async done => {
        const obj = { h: 3, m: 47 };
        const result = await app.post('/angle').send(obj);
        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty('result', 168.5);
        done();
    });
});