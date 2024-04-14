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

export async function DELETE(_:any, { params }: { params: { id: string } }) {
  const { id }: { id: string } = params;
  try {
    await dbConnect();
    const deleteProvider: ProviderModelInterface | null = await Provider.findByIdAndDelete(id);
    if (!deleteProvider) {
      console.error(`\nError: No provider found with id: ${id}`);
      return Response.json({ message: "Provider not found!" }, { status: 404 });
    }
    console.log("Provider Deleted Successfully!");
    return Response.json(
      { message: "Provider Deleted Successfully!" },
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