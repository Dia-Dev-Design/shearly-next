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

type PutBody = {
    businessImage?: string;
    images?: [ string ];
    name: string;
    phone?: string;
    address?: object;
    owner: Types.ObjectId[];
};

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id }: { id: string } = params;
  try {
    const body: PutBody = await req.json();
    await dbConnect();

    if(body.name === "" || body.name == null|| body.owner === null ){
      console.error(`\nError:Business name and owner must not be empty!`);
      return Response.json(
        { message: `Business name and owner must not be empty!` },
        { status: 400 }
      );
    }

    const editedBusiness: BusinessModelInterface | null = await Business.findByIdAndUpdate(id, { ...body }, {new:true});
    if (!editedBusiness) {
      console.error(`\nError: No business found with this id: ${id}`);
      return Response.json(
        { message: "Business not found!" }, 
        { status: 400 }
      );
    }
    console.log("Success!");
    return Response.json(
      { message: "OK", business: editedBusiness },
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
      console.error("\nInternal Server Error! Error:\n", error.message);
      return Response.json(
        {
          message: "Internal Server Error!",
        },
        { status: 500 }
      );
    }
  }
}