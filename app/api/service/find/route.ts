import dbConnect from "@/app/lib/dbConnect";
import Service from "@/app/models/Service";

interface IService {
  name: string;
  price?: number;
  image?: string;
  description?: string;
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const findAllServices: IService[] = await Service.find();
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
        message: `${findAllServices.length} were found!`,
        services: findAllServices,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("\nInternal Server Error! Error:", error.message);
    return Response.json(
      {
        message: "Internal Server Error!",
      },
      { status: 500 }
    );
  }
}
