import MongoMock from '../utils/MongoMock';
import app from '../app'
import request from 'supertest';



describe('All end point drivers', () => {
    beforeAll(async () => {
        await MongoMock.connect();
    });

    afterAll(async () => {
        await MongoMock.disconnect();
    });

    it('should be able to create a new driver', async done => {
        const body = {
            name: 'test'

        };

        const response = await request(app)
            .post(`/api/drivers/create`)
            .send(body);


        try {
            expect(response.status)
            done();
        } catch (err) {
            done(err);
        }


    });

    it('should be able to trashed driver and filter by name', async done => {

        const driver: any = await request(app)
            .get(`/api/drivers/filter?text=test`)

        const id = JSON.parse(driver.text).drivers[0].items[0]._id



        const trashed: any = await request(app)
            .patch(`/api/drivers/delete/${id}`)

        let isTrashed = trashed.body.driver.trashed

        try {
            expect(driver.status).toBe(200);
            expect(isTrashed)
            done();
        } catch (err) {
            done(err);
        }
    });

    it('should be able to update driver by id', async done => {

        const driver: any = await request(app)
            .get(`/api/drivers/filter?text=test`)

        const id = JSON.parse(driver.text).drivers[0].items[0]._id

        const body = { name: "test successfully" }


        const update: any = await request(app)
            .put(`/api/drivers/${id}`).send(body)



        try {
            expect(driver.status).toBe(200);
            expect(update)
            done();
        } catch (err) {
            done(err);
        }
    });



})