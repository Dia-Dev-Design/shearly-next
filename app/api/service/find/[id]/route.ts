import dbConnect from "@/app/lib/dbConnect";
import Service from "@/app/models/Service";
interface ServiceModelInterface {
  _id: string;
  name: string;
  price?: number;
  image?: string
  description?: string;
}

export async function GET(_:any, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await dbConnect();
    const findService: ServiceModelInterface | null = await Service.findById(id);
    if (!findService) {
      console.error(`\nError: No service found with id: ${id}`);
      return Response.json({ message: "Service not found!" }, { status: 404 });
    }

    console.log("Success!");
    return Response.json(
      { message: "OK", service: findService },
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
