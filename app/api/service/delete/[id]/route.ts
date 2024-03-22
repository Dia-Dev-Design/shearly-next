import dbConnect from "@/app/lib/dbConnect";
import Service from "@/app/models/Service";

interface ServiceModelInterface {
  _id: string;
  name: string;
  price?: number;
  image?: string
  description?: string;
}

export async function DELETE(_:any, { params }: { params: { id: string } }) {
  const { id }: { id: string } = params;
  try {
    await dbConnect();
    const deleteService: ServiceModelInterface | null = await Service.findByIdAndDelete(id);
    if (!deleteService) {
      console.error(`\nError: No service found with id: ${id}`);
      return Response.json({ message: "Service not found!" }, { status: 404 });
    }
    console.log("Service Deleted Successfully!");
    return Response.json(
      { message: "Service Deleted Successfully!" },
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
