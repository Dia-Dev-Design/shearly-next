import { NextRequest } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Client from "../../../models/Client";
import bcrypt from "bcrypt";

export async function POST( req: NextRequest ) {
    try {
      const body = await req.json();
      console.log(body);

      await dbConnect();

      // Check if both work in having to add the verify that a Client with said email doesn't exist.
      // Also encrypt the password using bcrypt.

      const findClientEmail = await Client.findOne({ email: body.email });

      if(findClientEmail){
        console.error("\nError: Client email already exist!");
        
        return Response.json({message: "Client email already exist!"}, {status: 400});
      }

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(body.password, salt);

      const response = await Client.create({...body, password: hashedPassword});

      return Response.json({message: "Client Created!", client: response}, {status: 200});
    } catch ( error: any ) {
      console.error("Internal Server Error: ", error.message);
      return Response.json({message: "Internal Server Error!", error});
    }
};