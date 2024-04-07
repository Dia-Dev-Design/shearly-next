import dbConnect from "@/app/lib/dbConnect";
import Business from "@/app/models/Business";
import { Document, Types } from "mongoose";

interface BusinessModelInterface extends Document {
    _id: string;
    image: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: object;
    specialCare: object;
    appointments: Types.ObjectId[];
    transactions: Types.ObjectId[];
};

export async function GET() {
  try {
    await dbConnect();
    const findAllBusiness: BusinessModelInterface[] = await Business.find();
    if (!findAllBusiness.length) {
      console.log("No Business in Database!");
      return Response.json(
        {
          message: "There are currently no Business saved!",
          services: findAllBusiness,
        },
        { status: 200 }
      );
    }
    console.log("Success!");
    return Response.json(
      {
        message: `${findAllBusiness.length} Business were found!`,
        services: findAllBusiness,
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.name === "MongoNetworkError") {
      console.error(`\nError: Database is offline!\n${error.message}`);
      return Response.json(
        { message: "Database is offline!" },
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