import dbConnect from "@/app/lib/dbConnect";
import mongoose from "mongoose";
import Client from "@/app/models/Client";
import { Document, Types } from "mongoose";
import bcrypt from "bcrypt";

interface ClientModelInterface extends Document {
  _id: Types.ObjectId;
  image: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address?: object;
  specialCare?: object;
  appointments: Types.ObjectId[];
  transactions: Types.ObjectId[];
};

type PostBody = {
  image?: string;
  name?: string;
  email?: string;
  password: string;
  phone?: string;
  address?: object;
  specialCare?: object;
};

export async function POST(req: Request) {
  try {
    const body: PostBody = await req.json();
    await dbConnect();
    const findClient: ClientModelInterface | null = await Client.findOne({
      email: body.email,
    });
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    if(body.name === null || body.email === null || body.password === null){
      console.error(`\nError: Client name, email and password must not be empty!`);
      return Response.json(
        { message: ` Client name, email and password must not be empty!` },
        { status: 400 }
      );
    }
    
    if (findClient) {
      console.error(`\nError: Client with email: ${body.email} already exists!`);
      return Response.json(
        { message: `Client with email: ${body.email} already exists!` },
        { status: 400 }
      );
    }
    const createClient: ClientModelInterface = await Client.create({...body, password: hashedPassword});
    console.log("Success!");
    return Response.json(
      { message: "OK", client: createClient },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "MongoNetworkError") {
      console.error(`\nError: Database is offline!\n${error.message}`);
      return Response.json(
        { message: "Database is offline!" },
        { status: 500 }
      );
    } else if (error instanceof mongoose.Error.ValidationError) {
      console.error("\nMongoose Schema Validation Error ==> ", error.message);
      return Response.json(
        {
          message: "Name is required to create a Service!",
        },
        { status: 500 }
      );
    } else {
      console.error("\nInternal Server Error! Error:", error.message);
      return Response.json(
        {
          message: "Internal Server Error!",
        },
        { status: 500 }
      );
    }
  }
}
