import dbConnect from "@/app/lib/dbConnect";
import Client from "@/app/models/Client";
import { ObjectId } from "mongoose";

interface ClientModelInterface {
    _id: string;
    image: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: object;
    specialCare: object;
    appointments: ObjectId;
    transactions: ObjectId;
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