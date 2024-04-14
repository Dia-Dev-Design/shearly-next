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


describe("Testing Client Create", () => {
    it("Should Create A Client Given A Name, Email, Password And Phone", async () => {
        try {
            const response = await axios.post(testingApiUrl, clientCreateBody) 
            expect(response.status).toBe(201)
        } catch (error) {
            expect(true).toBe(false);
        }
    })
    it("Should Fail To Create A Client If Email Exist", async () => {
        try {
            await axios.post(testingApiUrl, clientCreateBody)
            try {
                await axios.post(testingApiUrl, clientCreateBody)
                expect(true).toBe(false);
            } catch (error) {
                const axiosError = error as any;
                expect(axiosError.response.status).toBe(400)
            }
        } catch (error) {
            expect(true).toBe(false);
        }
    })
    it("Should Fail To Create A Client If Name Is An Empty String", async () => {
        try {
            await axios.post(testingApiUrl, {...clientCreateBody, name: ""})
            expect(true).toBe(false);
        } catch (error) {
            const axiosError = error as any;
            expect(axiosError.response.status).toBe(400)
        }
    })
    it("Should Fail To Create A Client If Email Is An Empty String", async () => {
        try {
            await axios.post(testingApiUrl, {...clientCreateBody, email: ""})
            expect(true).toBe(false);
        } catch (error) {
            const axiosError = error as any;
            expect(axiosError.response.status).toBe(400)
        }
    })
    it("Should Fail To Create A Client If Password Is An Empty String", async () => {
        try {
            await axios.post(testingApiUrl, {...clientCreateBody, password: ""})
            expect(true).toBe(false);
        } catch (error) {
            const axiosError = error as any;
            console.log(axiosError);
            expect(axiosError.response.status).toBe(400)
        }
    })
    it("Should Fail To Create A Client If No Name,Email Or Password Was Given", async () => {
        try {
            await axios.post(testingApiUrl, {})
            expect(true).toBe(false);
        } catch (error) {
            const axiosError = error as any;
            expect(axiosError.response.status).toBe(500)
        }
    })
    afterEach(async () => {
        await Client.deleteMany({name: {$regex: new RegExp(clientCreateBody.name, 'i')}})
    })
})
