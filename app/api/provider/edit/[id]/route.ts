import dbConnect from "@/app/lib/dbConnect";
import mongoose from "mongoose";
import Provider from "@/app/models/Provider";
import { Document, Types } from "mongoose";
import bcrypt from "bcrypt";

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

type PUTBody = {
    name?: string;
    email?: string;
    password: string;
    phone?: string;
    address?: object;
    employment?: string;
    profileImage?: string;
    images?: [string];
};

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id }: { id: string } = params;
  try {
    const body: PUTBody = await req.json();
    await dbConnect();

    if (body.email){
        const findProvider: ProviderModelInterface | null = await Provider.findOne({
            email: body.email,
        });

        if (findProvider && findProvider._id.toString() !== id) {
            console.error("\nError: Provider email already exists!");

            return Response.json({ message: "Provider email already exists!" }, { status: 400 });
        }
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    body.password = hashedPassword;

    const editedProvider: ProviderModelInterface | null = await Provider.findByIdAndUpdate(id, { ...body }, {new:true});
    if (!editedProvider) {
      console.error(`\nError: No provider found with id: ${id}`);
      return Response.json({ message: "Provider not found!" }, { status: 404 });
    }
    console.log("Success!");
    return Response.json(
      { message: "OK", service: editedProvider },
      { status: 400 }
    );
  } catch (error: any) {
    if (error.name === "MongoNetworkError") {
      console.error(`\nError: Database is offline!\n${error.message}`);
      return Response.json(
        { message: "Database is offline!" },
        { status: 500 }
      );
    } else if (error instanceof mongoose.Error.ValidationError) {
      console.error(`\nMongoose Schema Validation Error ==> ${error.message}`);
      return Response.json(
        {
          message: "A unique email is required to have on each client!",
        },
        { status: 400 }
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