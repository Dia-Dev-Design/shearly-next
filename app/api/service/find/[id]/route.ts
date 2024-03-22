import dbConnect from "@/app/lib/dbConnect";
import Service from "@/app/models/Service";
interface IService {
  name: string;
  price?: number;
  image?: string;
  description?: string;
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await dbConnect();
    const findService: IService | null = await Service.findById(id);
    if (!findService) {
      console.error("Error: Service Not Found!");
      return Response.json({ message: "Service Not Found!" }, { status: 400 });
    }

    console.log("Success!");
    return Response.json(
      { message: "OK", service: findService },
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
