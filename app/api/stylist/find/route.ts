import dbConnect from "@/app/lib/dbConnect";
import Stylist from "@/app/models/Stylist";

export async function GET(){
    try {
        await dbConnect();
        const findAllStylists = await Stylist.find();
        if(!findAllStylists.length){
            console.error("No Stylists Found!");
            return Response.json({message: "No Stylists Found!", stylists: findAllStylists});
        }
        console.log("Success!");
        return Response.json({message: "OK", stylists: findAllStylists}, {status: 200})
    } catch (error:any) {
        console.error(error.message)
        throw error;
    }
}