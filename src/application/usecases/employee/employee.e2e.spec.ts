import request from "supertest";
import { app, port } from "../../../app";
import router from "../../../infra/routers/router";
import * as CRC32 from 'crc-32';
import {describe, test} from "vitest"


describe('Test all e2e', () => {
    test('teste e2e create', () => {
        app.use('/api', router);
        request(app.listen('2000', () => {
            console.log(`[server]: Server is running at http://localhost:2000`);
        })).post('/employee/create')
            .send({
                name: "Maria"
            }).expect(200)
    });

    test('teste e2e not create', () => {
        app.use('/api', router);
        request(app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        })).post('/employee/create')
            .send({
                name: "Patricia"
            }).expect(400)
    });

    test('teste e2e get employee by hash', () => {
        app.use('/api', router);
        const codigo = CRC32.str('Maria');
        const hash = (codigo >>> 0).toString(16).padStart(8, '0');
        request(app.listen('5000', () => {
            console.log(`[server]: Server is running at http://localhost:5000`);
        })).post('/employee/login')
            .send({
                hash: hash
            }).expect(200)
    });
});

describe('Create Worked Hours', () => {
    test('teste e2e create', () => {
        app.use('/api', router);
        request(app.listen('2001', () => {
            console.log(`[server]: Server is running at http://localhost:2001`);
        })).post('/workedHours/create')
            .send({
                employee_id: "employee_id_here",
                hours: 8
            }).expect(200)
    });

    test('teste e2e get worked hours by employee id', () => {
        app.use('/api', router);
        request(app.listen('5001', () => {
            console.log(`[server]: Server is running at http://localhost:5001`);
        })).get('/workedHours/employee_id_here')
            .expect(200)
    });

    test('teste e2e get worked hours by created', () => {
        app.use('/api', router);
        request(app.listen('5002', () => {
            console.log(`[server]: Server is running at http://localhost:5002`);
        })).get('/workedHours/created/employee_id_here')
            .expect(200)
    });
});

describe('Employee Management', () => {
    test('teste e2e get employee by id', () => {
        app.use('/api', router);
        request(app.listen('5003', () => {
            console.log(`[server]: Server is running at http://localhost:5003`);
        })).get('/employee/employee_id_here')
            .expect(200)
    });
});

describe('Type Management', () => {
    test('teste e2e get all types', () => {
        app.use('/api', router);
        request(app.listen('5004', () => {
            console.log(`[server]: Server is running at http://localhost:5004`);
        })).get('/type/')
            .expect(200)
    });
});
