import dbConnect from "@/app/lib/dbConnect";
import Service from "@/app/models/Service";
interface ServiceModelInterface {
  _id: string;
  name: string;
  price?: number;
  image?: string
  description?: string;
}

type PUTBody = {
    name?: string;
    price?: number;
    image?: any;
    description?: string;
  };

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id }: { id: string } = params;
  try {
    const body: PUTBody = await req.json();
    await dbConnect();
    if("name" in body && !body.name){
        console.error("\nError: Service Name must have a name!")
        return Response.json({message: "Service Name must have a name!"}, {status: 400})
    }
    if (body.name) {
        const findService: ServiceModelInterface | null = await Service.findOne({
            name: body.name,
        });
      if (findService && findService._id != id) {
        console.error("\nError: There exist a service with the same name!");
        return Response.json(
          { message: `A service with name: ${body.name} already exists!` },
          { status: 400 }
        );
      }
    }
    const editedService: ServiceModelInterface | null = await Service.findByIdAndUpdate(id, { ...body }, {new:true});
    if (!editedService) {
      console.error(`\nError: No service found with id: ${id}`);
      return Response.json({ message: "Service not found!" }, { status: 404 });
    }
    console.log("Success!");
    return Response.json(
      { message: "OK", service: editedService },
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
          message: "Name is required to create a Service!",
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
