import dbConnect from "../../../utils/dbConnect";
import Property from "../../../models/Property";

dbConnect();

export default async (req, res) => {
  const {
    query: { town },
    method,
  } = req;


switch (method) {
    case 'GET':  
        
    try {
        const property = await Property.find({"town":town});
 

        if(!property){
            return res.status(400).json({success:false})
        }

        res.status(200).json({success:true, data:property})
    } catch (error) {
        res.status(400).json({success:false})
        console.log("error...".error.message)
    }
        break;

        default :
        res.status(200).json({status:false})

        break;
}

}