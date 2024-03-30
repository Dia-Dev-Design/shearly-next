import dbConnect from "@/app/lib/dbConnect";
import Provider from "@/app/models/Provider";
import { Document, Types } from "mongoose";

interface ProviderModelInterface extends Document {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    phone: string;
    address?: object;
    employment?: string;
    profileImage?: string;
    images?: [string];
    business: Types.ObjectId[];
};

export async function GET() {
  try {
    await dbConnect();
    const findAllProviders: ProviderModelInterface[] = await Provider.find();
    if (!findAllProviders.length) {
      console.log("No Provider In Database!");
      return Response.json(
        {
          message: "There are currently no provider saved!",
          services: findAllProviders,
        },
        { status: 200 }
      );
    }
    console.log("Success!");
    return Response.json(
      {
        message: `${findAllProviders.length} Providers were found!`,
        services: findAllProviders,
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