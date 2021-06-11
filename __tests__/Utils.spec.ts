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
        const body = {
            car: "60c27707963d74f5f4c264e3",
            reason: "test",
            driver: "60c27707963d74f5f4c264e6"


        }

        const response = await request(app)
            .post(`/api/utils/create`)
            .send(body);


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

