import mongoose, { Mongoose } from 'mongoose';

class MongoMock {
  private database: Mongoose;

  async connect(): Promise<void> {
    if (!process.env.MONGO_URI) {
      throw new Error('MongoDB server not initialized');
    }
    jest.setTimeout(9000)
    this.database = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }

  disconnect(): Promise<void> {
    return this.database.connection.close();
  }
}

export default new MongoMock();
