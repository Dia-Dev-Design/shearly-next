import { NextRequest } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Client from "../../../../models/Client";
import bcrypt from "bcrypt";

export async function PUT( req: NextRequest, {params}: any){
    const { id }: { id: String } = params;

    try {
        const body = await req.json();
        console.log(body);

        await dbConnect();

        // Check if having to add the check if email is changed it must not exist in the database and password must be encrypted

        // Add a new step in which it before checking if the user changed the email based on their id
        if (body.email){
            const findExistingClient = await Client.findOne({ email: body.email });

            if (findExistingClient && findExistingClient._id.toString() !== id) {
                console.error("\nError: Client email already exists!");

                return Response.json({ message: "Client email already exists!" }, { status: 400 });
            }
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(body.password, salt);
        body.password = hashedPassword;

        const UpdateClient = await Client.findByIdAndUpdate(id, body, { new: true });

        if(!UpdateClient){
            console.error("\nError: Invalid Client Id!");

            return Response.json({message: "Invalid Client Id!"}, {status: 400});
        }

        console.log("Client Updated!");
        return Response.json({message: "Client Updated!", client: UpdateClient}, {status:200});
    } catch ( error: any ) {
        console.error("Internal Server Error: ", error.message);
        return Response.json({message: "Internal Server Error!", error});
    }
};