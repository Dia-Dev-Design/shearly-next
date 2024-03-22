import dbConnect from "@/app/lib/dbConnect";
import Service from "@/app/models/Service";

interface ServiceModelInterface {
  _id: string;
  name: string;
  price?: number;
  image?: string
  description?: string;
}

export async function GET() {
  try {
    await dbConnect();
    const findAllServices: ServiceModelInterface[] = await Service.find();
    if (!findAllServices.length) {
      console.log("No Service In Database!");
      return Response.json(
        {
          message: "There are currently no Services saved!",
          services: findAllServices,
        },
        { status: 200 }
      );
    }
    console.log("Success!");
    return Response.json(
      {
        message: `${findAllServices.length} services were found!`,
        services: findAllServices,
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
