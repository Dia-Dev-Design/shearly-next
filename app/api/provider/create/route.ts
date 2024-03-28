import dbConnect from "@/app/lib/dbConnect";
import mongoose from "mongoose";
import Provider from "@/app/models/Provider";
import { ObjectId } from "mongoose";
import bcrypt from "bcrypt";

interface ProviderModelInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: object;
  employment: string;
  profileImage: string;
  images: [ string ];
  business: ObjectId;
};

type PostBody = {
  name?: string;
  email?: string;
  password: string;
  phone?: string;
  address?: object;
  employment?: string;
  profileImage?: string;
  images?: [ string ];
};

export async function POST(req: Request) {
  try {
    const body: PostBody = await req.json();
    await dbConnect();
    const findProvider: ProviderModelInterface | null = await Provider.findOne({
      email: body.email,
    });
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    if (findProvider) {
        console.error(`\nError: Provider with email: ${body.email} already exists!`);
        return Response.json(
          { message: `Provider with email: ${body.email} already exists!` },
          { status: 400 }
        );
      }
    const createClient: ProviderModelInterface = await Provider.create({...body, password: hashedPassword});
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
        { status: 400 }
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