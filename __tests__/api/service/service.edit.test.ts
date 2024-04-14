import axios from "axios";
import mongoose from "mongoose";
import Service from "../../../app/models/Service";
const model = "Service";
const apiUrl = "http://localhost:3000/api/";
const createApiUrl = apiUrl + `${model.toLowerCase()}/create/`;
const testingApiUrl = apiUrl + `${model.toLowerCase()}/edit/`;
const URI = "mongodb://localhost:27017/shearly-next";

const serviceCreateBody = {
  name: "TestName",
};

// // Connect to your database
beforeAll(async () => {
  await mongoose.connect(URI).then((mongoose) => {
    console.log(
      `Connected to Mongo! Database name: "${mongoose.connections[0].name}"`
    );
  });

  await Service.deleteMany({name: {$regex: new RegExp(serviceCreateBody.name, 'i')}})
}, 300000);

afterAll(async () => {
  await mongoose.connection.close();
}, 300000);

describe("Testing Service Edit Route", () => {
  let createdService: any = null;
  it("Should Edit A Service Given a Name", async () => {
    try {
      const response: any = await axios
        .post(createApiUrl, serviceCreateBody)
        .then((response) => {
          console.log("Creating");
          return response;
        });
      createdService = response.data.service;
      try {
        const response: any = await axios
          .put(testingApiUrl + createdService._id, {
            name: `${serviceCreateBody.name} Edit`,
          })
          .then((response) => {
            console.log("Editing");
            return response;
          });
        expect(response.status).toBe(200);
      } catch (error) {
        expect(true).toBe(false);
      }
    } catch (error) {
      expect(true).toBe(false);
    }
  });
  it("Should Fail To Edit A Service If Name Is Falsy", async () => {
    try {
      const response = await axios.post(createApiUrl, serviceCreateBody);
      createdService = response.data.service;
      try {
        await axios.put(testingApiUrl + createdService._id, { name: "" });
        expect(true).toBe(false);
      } catch (error) {
        const axiosError = error as any;
        expect(axiosError.response.status).toBe(400);
      }
    } catch (error) {
      expect(true).toBe(false);

    }
  }, 300000);
  
  it("Should Fail To Edit Service If Another Exists With The Same Name", async () => {
    try {
      const response1 = await axios
      .post(createApiUrl, serviceCreateBody)
      .then((response) => {
        console.log("Creating");
        return response;
      });
      const response2 = await axios
      .post(createApiUrl, {name: `${serviceCreateBody.name} 1`})
      .then((response) => {
        console.log("Creating");
        return response;
      });
      
      createdService = [response1,response2];
      try {
        await axios
          .put(testingApiUrl + createdService[1]._id, { name: serviceCreateBody.name })
          .then(() => console.log("Editing"));
        expect(true).toBe(false);
      } catch (error) {
        const axiosError = error as any;
        expect(axiosError.response.status).toBe(400);
      }
    } catch (error) {
      expect(true).toBe(false);
    }
  });

  afterEach(async () => {
    if (createdService) {
      await Service.deleteMany({name: {$regex: new RegExp(serviceCreateBody.name, 'i')}});
      createdService = null;
    }
  });
});
