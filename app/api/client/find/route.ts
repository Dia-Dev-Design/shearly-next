import dbConnect from "@/app/lib/dbConnect";
import Client from "@/app/models/Client";
import { Document, Types } from "mongoose";

interface ClientModelInterface extends Document {
    _id: Types.ObjectId;
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
    const findAllClients: ClientModelInterface[] = await Client.find();
    if (!findAllClients.length) {
      console.log("No Client In Database!");
      return Response.json(
        {
          message: "There are currently no Client saved!",
          services: findAllClients,
        },
        { status: 200 }
      );
    }
    console.log("Success!");
    return Response.json(
      {
        message: `${findAllClients.length} clients were found!`,
        services: findAllClients,
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