import dbConnect from "@/app/lib/dbConnect";
import mongoose from "mongoose";
import Client from "@/app/models/Client";
import { Document, Types } from "mongoose";
import bcrypt from "bcrypt";

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

type PUTBody = {
    image?: string;
    name?: string;
    email?: string;
    password: string;
    phone?: string;
    address?: object;
    specialCare?: object;
};

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id }: { id: string } = params;
  try {
    const body: PUTBody = await req.json();
    await dbConnect();

    if (body.email){
        const findClient: ClientModelInterface | null = await Client.findOne({
            email: body.email,
        });

        if (findClient && findClient._id.toString() !== id) {
            console.error("\nError: Client email already exists!");

            return Response.json(
              { message: "Client email already exists!" },
              { status: 400 }
            );
        }
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(body.password, salt);
    body.password = hashedPassword;

    const editedClient: ClientModelInterface | null = await Client.findByIdAndUpdate(id, { ...body }, {new:true});
    if (!editedClient) {
      console.error(`\nError: No client found with id: ${id}`);
      return Response.json(
        { message: "Client not found!" }, 
        { status: 400 }
      );
    }
    console.log("Success!");
    return Response.json(
      { message: "OK", service: editedClient },
      { status: 200 }
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
