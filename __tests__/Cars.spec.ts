import MongoMock from '../utils/MongoMock';
import app from '../app'
import request from 'supertest';



describe('All end point cars', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });



  it('should be able to create a new car', async done => {
    const body = {
      plate: 'asd1296',
      color: 'blue123',
      brand: 'FIAT',
    };

    const response = await request(app)
      .post(`/api/cars/create`)
      .send(body);


    try {
      expect(response.status)
      done();
    } catch (err) {
      done(err);
    }


  });

  it('should be able to trashed car and filter by color', async done => {

    const car: any = await request(app)
      .get(`/api/cars/filter?text=blue123`)

    const plate = JSON.parse(car.text).cars[0].items[0].plate

    const body = { plate: `${plate}` }

    const trashed: any = await request(app)
      .patch(`/api/cars/delete/`).send(body)

    let isTrashed = trashed.body.car.trashed

    try {
      expect(car.status).toBe(200);
      expect(isTrashed)
      done();
    } catch (err) {
      done(err);
    }
  });

  it('should be able to get all cars', async done => {

    const cars: any = await request(app)
      .get(`/api/cars`)



    try {
      expect(cars.status).toBe(200);
      expect(cars)
      done();
    } catch (err) {
      done(err);
    }
  });

  it('should be able to update car by Id', async done => {
    const body = {
      plate: 'asd1296',
      color: 'blue123',
      brand: 'Test jest Success',
    };

    const car: any = await request(app)
      .get(`/api/cars/filter?text=blue123`)

    const id = JSON.parse(car.text).cars[0].items[0]._id



    const response: any = await request(app)
      .put(`/api/cars/${id}`)
      .send(body);


    try {
      expect(car.status).toBe(200);
      expect(JSON.parse(response.text).message).toEqual("Veículo atualizado com suceso")
      done();
    } catch (err) {
      done(err);
    }


  });

})


