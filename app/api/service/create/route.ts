import dbConnect from "@/app/lib/dbConnect";
import mongoose from "mongoose";
import Service from "@/app/models/Service";

type PostBody = {
  name: string;
  price?: number;
  image?: string;
  description?: string;
};

interface IService {
  name: string;
  price?: number;
  image?: string;
  description?: string;
}

export async function POST(req: Request) {
  try {
    const body: PostBody = await req.json();
    await dbConnect();
    if (!body.name) {
      console.error("\nError: Service name is Required!");
      return Response.json(
        { message: "Service name is Required!" },
        { status: 400 }
      );
    }
    const findService: IService | null = await Service.findOne({
      name: body.name,
    });
    if (findService) {
      console.error(`\nError: Service with name: ${body.name} already exists!`);
      return Response.json(
        { message: `Service with name: ${body.name} already exists!` },
        { status: 400 }
      );
    }
    const createService: IService = await Service.create({ ...body });
    console.log("Success!");
    return Response.json(
      { message: "OK", service: createService },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "MongoNetworkError") {
      console.error(`\nError: Database is offline!\n${error.message}`);
      return Response.json(
        { message: "Database is offline!" },
        { status: 500 }
      );
    } else if (error instanceof mongoose.Error.ValidationError) {
      console.error("\nMongoose Schema Validation Error ==> ", error.message);
      return Response.json(
        {
          message: "Name is required to create a Service!",
        },
        { status: 400 }
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
