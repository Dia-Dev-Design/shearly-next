import dbConnect from "@/app/lib/dbConnect";
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
};

export async function DELETE(_:any, { params }: { params: { id: string } }) {
  const { id }: { id: string } = params;
  try {
    await dbConnect();
    const deleteBusiness: BusinessModelInterface | null = await Business.findByIdAndDelete(id);
    if (!deleteBusiness) {
      console.error(`\nError: No business found with this id: ${id}`);
      return Response.json({ message: "Business not found!" }, { status: 404 });
    }
    console.log("Business Deleted Successfully!");
    return Response.json(
      { message: "Business Deleted Successfully!" },
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