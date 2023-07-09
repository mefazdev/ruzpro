import dbConnect from "../../../utils/dbConnect";
import Viewed from "../../../models/Viewed";

dbConnect();

export default async (req,res)=>{
    const {method} = req;

    switch(method){
        case 'GET':
            try {
                const viewed  = await Viewed.find({});
                res.status(200).json({ success:true, data:viewed})
            }catch (error){
                res.status(400).json({ success: false})
            }
            break;

            case 'POST':
                try {
               
                    const viewed = await Viewed.create(req.body);
                    res.status(201).json({ success:true, data:viewed})
                }catch (error){
                    res.status(400).json({success:false,error:error.message});
                }
                break

                default:
                    res.status(400).json({success:false});
    }
}