import axios from "axios";
import mongoose from "mongoose";
import Service from '../../../app/models/Service';
const model = "Service";
const apiUrl = "http://localhost:3000/api/";
const testingApiUrl = apiUrl + `${model.toLowerCase()}/create`;
const URI = "mongodb://localhost:27017/shearly-next";

const serviceCreateBody = {
  name: "TestName",
};



// // Connect to your database
beforeAll(async () => {
  await mongoose.connect(URI).then(mongoose =>{
    console.log(
      `Connected to Mongo! Database name: "${mongoose.connections[0].name}"`
    );
  });

  await Service.deleteMany({name: {$regex: new RegExp(serviceCreateBody.name, 'i')}})

},300000);

afterAll(async () => {
  await mongoose.connection.close();
},300000);


describe("Testing Service Create Route", () => {
  let createdService: any = null;
  it("Should Create A Service Given a Name", async () => {
    try { 
      const response:any = await axios.post(testingApiUrl, serviceCreateBody).then((response)=> {console.log("Creating"); return response});
      createdService = response.data.service
      expect(response.status).toBe(201)
    } catch (error) {
      expect(true).toBe(false)
    }
  })
  it("Should Fail To Create A Service If Name Is Missing", async () => {
    try {
      await axios.post(testingApiUrl,{})
      expect(true).toBe(false)
    } catch (error) {
      const axiosError = error as any;
      expect(axiosError.response.status).toBe(400)
    }
  }, 300000)
  it("Should Fail To Create A Service If Name Is Falsy", async () => {
    try {
      await axios.post(testingApiUrl,{name: ""})
      expect(true).toBe(false)
    } catch (error) {
      const axiosError = error as any;
      expect(axiosError.response.status).toBe(400)
    }
  },300000)
  it("Should Fail To Create A Service With The Same Name Already Exists", async () => {
    try {
      const response:any = await axios.post(testingApiUrl, serviceCreateBody).then((response)=> {console.log("Creating"); return response});
      createdService = response.data.service;
      try {
        await axios.post(testingApiUrl,serviceCreateBody)
        expect(true).toBe(false)
      } catch (error) {
        const axiosError = error as any;
        expect(axiosError.response.status).toBe(400)
      }
    } catch (error) {
      expect(true).toBe(false)
    }
    
  }, 300000)
  afterEach(async () => {
    if(createdService){
      await Service.findByIdAndDelete(createdService._id).then(()=> console.log("Deleting"))
      createdService = null;
    }
  })
})

