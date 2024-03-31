import axios from "axios";
import Client from "../../../app/models/Client";
import mongoose from "mongoose";
const model = "Client";
const apiUrl = "http://localhost:3000/api/";
const testingApiUrl = apiUrl + `${model.toLowerCase()}/create`;
const URI = "mongodb://localhost:27017/shearly-next";

const clientCreateBody = {
  name: "TestName",
  email: "test@email.com",
  password: "1234",
  phone: "555-555-5555"
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