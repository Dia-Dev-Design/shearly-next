import dbConnect from "@/app/lib/dbConnect";
import Provider from "@/app/models/Provider";
import { Document, Types } from "mongoose";

interface ProviderModelInterface extends Document {
    _id: string;
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

export async function GET(_:any, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await dbConnect();
    const findProvider: ProviderModelInterface | null = await Provider.findById(id);
    if (!findProvider) {
      console.error(`\nError: No provider found with id: ${id}`);
      return Response.json({ message: "Provider not found!" }, { status: 404 });
    }

    console.log("Success!");
    return Response.json(
      { message: "OK", provider: findProvider },
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