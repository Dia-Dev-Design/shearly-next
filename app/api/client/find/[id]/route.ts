import dbConnect from "@/app/lib/dbConnect";
import Client from "@/app/models/Client";
import { Document, Types } from "mongoose";

interface ClientModelInterface extends Document {
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

export async function GET(_:any, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await dbConnect();
    const findClient: ClientModelInterface | null = await Client.findById(id);
    if (!findClient) {
      console.error(`\nError: No Client found with id: ${id}`);
      return Response.json({ message: "Client not found!" }, { status: 404 });
    }

    console.log("Success!");
    return Response.json(
      { message: "OK", service: findClient },
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