import axios from "axios";
import Client from "../../../app/models/Client";
import mongoose from "mongoose";
const model = "Client";
const apiUrl = "http://localhost:3000/api/";
const createApiUrl = apiUrl + `${model.toLowerCase()}/create/`;
const testingApiUrl = apiUrl + `${model.toLowerCase()}/edit/`;
const URI = "mongodb://localhost:27017/shearly-next";

const clientCreateBody = {
  name: "TestName",
  email: "test@email.com",
  password: "1234",
  phone: "555-555-5555",
};

// // Connect to your database
beforeAll(async () => {
  await mongoose.connect(URI).then((mongoose) => {
    console.log(
      `Connected to Mongo! Database name: "${mongoose.connections[0].name}"`
    );
  });

  await Client.deleteMany({
    name: { $regex: new RegExp(clientCreateBody.name, "i") },
  });
}, 300000);

afterAll(async () => {
  await mongoose.connection.close();
}, 300000);

describe("Testing Client Edit", () => {
  it("Should Edit Any Property Of A Client", async () => {
    try {
      const creatingClient: any = await axios.post(createApiUrl,clientCreateBody);
      try {
        const response = await axios.put(testingApiUrl + creatingClient.data.client._id, {
          ...clientCreateBody,
          email: "testEdit@gmail.com",
        });
        expect(response.status).toBe(200);
      } catch (error) {
        expect(true).toBe(false);
      }
    } catch (error) {
      expect(true).toBe(false);
    }
  },300000);
  it("Should Fail to Edit Email If Another Client Has The Same Email", async () => {
    let creatingClient2: any
    try {
        const creatingClient: any = await axios.post(createApiUrl,clientCreateBody);
        creatingClient2 = await axios.post(createApiUrl,{...clientCreateBody, email: "test2@email.com"});
    } catch (error) {
      expect(true).toBe(false);
    }

    try {
        await axios.put(testingApiUrl + creatingClient2.data.client._id, {
            ...clientCreateBody,
            email: "test@email.com",
          })
      expect(true).toBe(false);
    } catch (error) {
      const axiosError = error as any;
      expect(axiosError.response.status).toBe(400)
    }
  },300000);
  afterEach(async () => {
    await Client.deleteMany({
      name: { $regex: new RegExp(clientCreateBody.name, "i") },
    });
  }, 300000);
});
