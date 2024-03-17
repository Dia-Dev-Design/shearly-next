import { NextRequest } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Client from "../../../models/Client";

const bcrypt = require("bcrypt");

export async function POST( req: NextRequest ) {
    try {
      const request = await req.json();
      console.log(request);

      await dbConnect();

      // Check if both work in having to add the verify that a Client with said email doesn't exist.
      // Also encrypt the password using bcrypt.

      const findClientEmail = await Client.findOne(request.email);

      if(findClientEmail){
        console.error("\nError: Client email already exist!");
        
        return Response.json({message: "Client email already exist!"}, {status: 400});
      }

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(request.password, salt);

      const response = await Client.create({
        image: request.image,
        name: request.name,
        email: request.email,
        password: hashedPassword,
        phone: request.phone,
        address: request.address,
        specialCare: request.specialCare,
        appointments: request.appointments,
        transactions: request.transactions
      });

      // await response.save();
      return new Response(JSON.stringify({message: "Client Created!" , client: response }));
    } catch ( error: any ) {
      console.error("Internal Server Error: ", error.message);
      return Response.json({message: "Internal Server Error!", error});
    }
};