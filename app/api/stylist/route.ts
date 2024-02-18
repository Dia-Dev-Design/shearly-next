import { NextRequest } from "next/server";
import Stylist from "../../models/Stylist";
import dbConnect from "@/app/lib/dbConnect";

export async function POST(req: NextRequest) {
  try {
    const r = await req.json();
    console.log(r);
    await dbConnect();
    const response = await Stylist.create({ name: "Test Api 1" });
    // await response.save();
    return new Response(JSON.stringify({ stylist: response }));
  } catch (error) {
    console.log(error);
    throw error;
  }
}
