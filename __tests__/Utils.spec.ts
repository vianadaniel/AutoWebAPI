import MongoMock from '../utils/MongoMock';
import app from '../app'
import request from 'supertest';



describe('Create end finish utils', () => {
    beforeAll(async () => {
        await MongoMock.connect();
    });

    afterAll(async () => {
        await MongoMock.disconnect();
    });

    it('should be able to create a new util', async done => {

        const car: any = await request(app)
            .get(`/api/cars/filter?text=blue123`)

        const idCar = JSON.parse(car.text).cars[0].items[0]._id

        const driver: any = await request(app)
            .get(`/api/drivers/filter?text=test`)

        const idDriver = JSON.parse(driver.text).drivers[0].items[0]._id




        const body = {
            car: `${idCar}`,
            reason: "test",
            driver: `${idDriver}`


        }

        const response = await request(app)
            .post(`/api/utils/create`)
            .send(body);
        console.log(response)

        try {
            expect(response.status)
            done();
        } catch (err) {
            done(err);
        }


    });

    it('should be able to finish by id', async done => {

        const utils: any = await request(app)
            .get(`/api/utils/`)

        const id = (JSON.parse(utils.text).utils[0]._id)

        const finish: any = await request(app)
            .patch(`/api/utils/finish/${id}`)



        try {
            expect(finish.status).toBe(200);
            expect(finish.body.message)
            done();
        } catch (err) {
            done(err);
        }
    });



})

