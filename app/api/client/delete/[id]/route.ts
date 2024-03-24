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

export async function DELETE(_:any, { params }: { params: { id: string } }) {
  const { id }: { id: string } = params;
  try {
    await dbConnect();
    const deleteClient: ClientModelInterface | null = await Client.findByIdAndDelete(id);
    if (!deleteClient) {
      console.error(`\nError: No client found with id: ${id}`);
      return Response.json({ message: "Client not found!" }, { status: 404 });
    }
    console.log("Client Deleted Successfully!");
    return Response.json(
      { message: "Client Deleted Successfully!" },
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