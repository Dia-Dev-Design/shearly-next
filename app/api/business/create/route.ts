import dbConnect from "@/app/lib/dbConnect";
import mongoose from "mongoose";
import Business from "@/app/models/Business";
import { Document, Types } from "mongoose";

interface BusinessModelInterface extends Document {
  _id: Types.ObjectId;
  businessImage?: string;
  images?: [ string ];
  name: string;
  phone?: string;
  address?: object;
  owner: Types.ObjectId[];
  employees?: Types.ObjectId[];
  appointments?: Types.ObjectId[];
  transactions?: Types.ObjectId[];
}

type PostBody = {
  name: string;
  owner: Types.ObjectId[];
};

export async function POST(req: Request) {
  try {
    const body: PostBody = await req.json();
    await dbConnect();

    const createBusiness: BusinessModelInterface = await Business.create({...body});
    console.log("Success!");
    return Response.json(
      { message: "OK", business: createBusiness },
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
          message: "Name is required to create a Business!",
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